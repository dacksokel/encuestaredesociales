const router = require("express").Router();

// modelo
const Encuestados = require("../modelos/encuestado");

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

  res.json({
    facebook: parseFloat(f / facebook.length).toFixed(2),
    whatsapp: parseFloat(w / whatsapp.length).toFixed(2),
    twitter: parseFloat(t / twitter.length).toFixed(2),
    instagram: parseFloat(i / instagram.length).toFixed(2),
    tiktok: parseFloat(ti / tiktok.length).toFixed(2),
  });
});

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
