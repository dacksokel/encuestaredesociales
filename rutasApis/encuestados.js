const router = require("express").Router();

const { ElementTypes } = require("@vue/compiler-core");
// modelo
const Encuestados = require("../modelos/encuestado");

// apis gets
router.get("/", async (req, res) => {
  let encuentas = await Encuestados.find().count();
  res.json({
    cantidad: encuentas,
  });
});
router.get("/promedioredesociales", async (req, res) => {
  // dejo este comentario este no seria el mejor metodo
  // lo ideal es que exista una base de dato solo con estos datos
  // de esa forma solo se llaman los resultados y listo
  // este metodo funciona pero es mucho el proceso que hace en el servidor
  // aunque no hay problemas esta vez porque es para demostracion
  let datos = await Encuestados.find();
  let facebook = [],
    whatsapp = [],
    twitter = [],
    instagram = [],
    tiktok = [];
  for (encuestados of datos) {
    for (red of encuestados.redesTiempo) {
      if (red.nombre === "facebook") {
        facebook.push(red.tiempo);
      }
      if (red.nombre === "WhatsApp") {
        whatsapp.push(red.tiempo);
      }
      if (red.nombre === "Twitter") {
        twitter.push(red.tiempo);
      }
      if (red.nombre === "Instagram") {
        instagram.push(red.tiempo);
      }
      if (red.nombre === "Tiktok") {
        tiktok.push(red.tiempo);
      }
    }
  }
  const f = facebook.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const w = whatsapp.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const t = twitter.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const i = instagram.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );
  const ti = tiktok.reduce(
    (previousValue, currentValue) => previousValue + currentValue
  );

  let promedios = {
    facebook: parseFloat(f / facebook.length).toFixed(2),
    whatsapp: parseFloat(w / whatsapp.length).toFixed(2),
    twitter: parseFloat(t / twitter.length).toFixed(2),
    instagram: parseFloat(i / instagram.length).toFixed(2),
    tiktok: parseFloat(ti / tiktok.length).toFixed(2),
  };
  res.json({
    promedio:promedios
  });
});

router.get("/fav", async (req, res) => {
  let datos = await Encuestados.find();
  datos = datos.map((e) => e.redfav);
  // esta funcion crea un nuevo objeto donde dice la cantidad de veces que se repiten las cosas o los datos dentro de un array
  const resultado = datos.reduce(
    (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
    {}
  );
  let redFavorita = "";
  let redMenosfav = "";
  let numeroMayor = 0,
    numeroMenor = 0;

  for (const key in resultado) {
    if (Object.hasOwnProperty.call(resultado, key)) {
      const elemento = resultado[key];
      if (numeroMayor == 0) {
        numeroMenor = elemento;
        numeroMayor = elemento;
      }
      if (elemento >= numeroMayor) {
        numeroMayor = elemento;
        redFavorita = key;
      }
      if (numeroMenor >= elemento) {
        numeroMenor = elemento;
        redMenosfav = key;
      }
    }
  }

  res.json({
    estadisticas: resultado,
    favorita: redFavorita,
    nopopular: redMenosfav,
  });
});

router.get("/edadrango", async (req, res)=>{
  // creo que esta api es mejor que la que hice de primera de las redes sociales para sacar el promedio 
  // pero bueno diferentes caminos llevan al mismo destino :D
  let datos = await Encuestados.find();
  let edadRango = {}; // esta es el objeto que contendra los datos para calcular los rangos de las edades
// con este ciclo sacamos la edad y la armacenamos en un objeto de arreglos
// donde el nombre de cada objeto es la edad y los arreglos que son el valor de cada rango de edad son las redes sociales
// a mayor cantidad de concurrencias de redes sociales mejor asi luego pasa al siguiente paso
  for (const encuesta of datos) {
    let redsocial = '', numeroMayor = 0, edad = encuesta.edad
    let object = encuesta.redesTiempo
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if(numeroMayor == 0){
          numeroMayor = element.tiempo
          redsocial = element.nombre
        }
        if(element.tiempo > numeroMayor){
          numeroMayor = element.tiempo
          redsocial = element.nombre          
        }
      }
    }
    if(edadRango[edad] != undefined){
      edadRango[edad].push(redsocial)
    }else{
      edadRango[edad] = []
      edadRango[edad].push(redsocial)      
    }
  }

  // ahora esos datos los tomamos y validamos la cantidad de concurrencia de una red social en el objeto de edadRango
  for (const edades in edadRango) {
    // con este ciclo voy a restructurar el objeto edadRango   
   const resultado = edadRango[edades].reduce(
     (prev, cur) => ((prev[cur] = prev[cur] + 1 || 1), prev),
     {}
   );   
  edadRango[edades]  = resultado
}

console.log("🚀 ~ file: encuestados.js ~ line 153 ~ router.get ~ edadRango", edadRango)
  return res.json(edadRango)

})

// apis posts

router.post("/crearEncuestado", async (req, res) => {
  // con esta api creamos al encuestado el cual no se podra repetir
  // al repetirse se enviara un false
  let encuestado = req.body;

  let encues = await Encuestados.findOne({ correo: encuestado.correo });

  if (!encues) {
    let encuestadoSave = new Encuestados(encuestado);
    await encuestadoSave.save();
    return res.json({
      respuesta: true,
    });
  }
  return res.json({
    respuesta: false,
  });
});
router.post("/validarencuestado", async (req, res) => {
  // con esta api creamos al encuestado el cual no se podra repetir
  // al repetirse se enviara un false
  let encuestado = req.body;
  let encues = await Encuestados.findOne({ correo: encuestado.correo });

  if (!encues) {
    return res.json({
      respuesta: false,
    });
  }
  return res.json({
    respuesta: true,
    datos: encues,
  });
});

module.exports = router;
