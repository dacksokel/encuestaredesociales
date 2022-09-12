const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();
const cors = require("cors");
const { mongoose } = require("./database");
const path = require("path");

//Setting puerto
app.set("port", process.env.PORT || 2000);

//Middleware --> funciones que se ejecuntan antes de llegar a las rutas
app.use(morgan("dev")); //para que se vean bien los cosole logs :D del servidor
// app.use(cors()); //esto es opcional aunque creo que no se necesita por ahora
app.use(express.json())

/** constantes para las rutas */
const EncuestadosRoutes = require("./rutasApis/encuestados");

//Routes
app.use("/encuestados", EncuestadosRoutes);
app.use('/estadisticas', (req,res)=>{
  // esto es solo porque es una version de comprobacion de conocimineot 
  // si fuera una version completa o de trabajo esto deberia redireccionar a las estadisticas de vue
  // 
  res.redirect('/')
})
app.use('/send',async (req, res)=>{
  console.log('iniciando envio de correo')

  var nodemailer = require('nodemailer');

// Crea el transportador con la configuración requerida para Gmail
// cambia el usuario y pasa!
var transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'caballitotrabajador@gmail.com',
        pass: 'caballitotrabajador1234567890'
    }
});


// configurar datos de correo electrónico
var mailOptions = {
    from: '"Our Code World " <caballitotrabajador@gmail.com>', // dirección del remitente (quién envía)
    to: 'dacksokel@gmail.com, sokealongeer@hotmail.com', // lista de receptores (quién recibe)
    subject: 'Hello', // Línea de asunto
    text: 'Hello world ', //cuerpo de texto plano
    html: '<b>Hello world </b><br> This is the first email sent with Nodemailer in Node.js' // cuerpo html
};

// enviar correo con objeto de transporte definido
transporter.sendMail(mailOptions, function(error, info){
    if(error){
        return console.log(error);
    }

    console.log('Message sent: ' + info.response);
});
res.send('enviando')
})

//Static files
app.use(express.static(path.join(__dirname, "public")));

// start server
let server;
server = app.listen(app.get("port"), () => {
  console.log(`servidor corriendo en el puerto :${app.get("port")}`);
});
