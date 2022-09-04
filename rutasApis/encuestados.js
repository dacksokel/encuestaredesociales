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
  let datos = await Encuestados.find();
  let edadRango = {}; // esta es el objeto que contendra los datos para calcular los rangos de las edades

  for (const encuesta of datos) {
    let redsocial = '', numeroMayor = 0, edad = encuesta.edad
    let object = encuesta.redesTiempo
    for (const key in object) {
      if (Object.hasOwnProperty.call(object, key)) {
        const element = object[key];
        if(numeroMayor == 0){
          numeroMayor = element.tiempo
        }
        if(element.tiempo > numeroMayor){
          numeroMayor = element.tiempo
          redsocial = element.nombre
        }
      }
    }
    console.log("🚀 ~ file: encuestados.js ~ line 127 ~ router.get ~ edad", edad)
    console.log("🚀 ~ file: encuestados.js ~ line 126 ~ router.get ~ redsocial", redsocial)
    if(edadRango[edad] != undefined){
      edadRango[edad].push(redsocial)
      console.log("🚀 ~ file: encuestados.js ~ line 134 ~ router.get ~ edadRango", edadRango)
    }else{
      edadRango[edad] = []
      edadRango[edad].push(redsocial)
      console.log("🚀 ~ file: encuestados.js ~ line 137 ~ router.get ~ edadRango", edadRango)
      
    }
  }

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
