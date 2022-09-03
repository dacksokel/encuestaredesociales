const mongoose = require("mongoose");
require("dotenv").config({
  path: "t.env",
});
//para el servidor online
// mongoose.connect(process.env.DB_URI,{
//         //solucion al error que daba al conectar la base de datos
//         useNewUrlParser: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//         useUnifiedTopology: true
//     })
//     .then(db => console.log('base de dato conectado a mongocloud'))
//     .catch(err => console.error("problemas al conectar la base de datos"))

const URI = "mongodb://localhost:27017/encuestas";
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("base de dato conectada correctamente"))
  .catch((err) => console.log("error al conectar a la base de dato", err));

module.exports = mongoose;
