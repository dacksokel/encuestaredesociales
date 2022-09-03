const router = require("express").Router();

// modelo
const Encuestados = require("../modelos/encuestado");

router.get("/", async (req, res) => {
  res.send("work los encuestados ");
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
  console.log("🚀 ~ file: encuestados.js ~ line 31 ~ router.post ~ encuestado", encuestado)
  
  let encues = await Encuestados.findOne({ correo: encuestado.correo });
  
  if (!encues) {
      console.log("🚀 ~ file: encuestados.js ~ line 33 ~ router.post ~ encues", encues)
    return res.json({
      respuesta: false,
    });
  }
  return res.json({
    respuesta: true,
    datos:encues
  });
});

module.exports = router;
