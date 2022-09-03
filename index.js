const express = require("express");
const morgan = require("morgan");
const app = express();
const cors = require("cors");
const { mongoose } = require("./database");
const path = require("path");


//Setting puerto
app.set("port", process.env.PORT || 2000);

//Middleware --> funciones que se ejecuntan antes de llegar a las rutas
app.use(morgan("dev")); //para que se vean bien los cosole logs :D del servidor
// app.use(cors()); //esto es opcional aunque creo que no se necesita por ahora


/** constantes para las rutas */


//Routes



//Static files
app.use(express.static(path.join(__dirname, "public")));


// start server
let server; 
server = app.listen(app.get("port"), () => {
  console.log(`servidor corriendo en el puerto :${app.get("port")}`);
});