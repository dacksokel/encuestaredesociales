const router = require("express").Router();

// modelo
const Encuestados = require("../modelos/encuestado");

router.get("/", async (req, res) => {
  res.send("work los encuestados ");
});
router.post("/crearEncuestado", async (req, res) => {
  let encuestado = req.body;
  console.log("🚀 ~ file: encuestados.js ~ line 11 ~ router.post ~ req.body", req.body)
  console.log("🚀 ~ file: encuestados.js ~ line 11 ~ router.post ~ encuestado", encuestado)
  
  let encues = await Encuestados.findOne({ correo: encuestado.correo });
  console.log("🚀 ~ file: encuestados.js ~ line 15 ~ router.post ~ encues", encues)
  
  if (!encues) {
      console.log("🚀 ~ file: encuestados.js ~ line 11 ~ router.post ~ encuestado", encuestado)
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

module.exports = router;
