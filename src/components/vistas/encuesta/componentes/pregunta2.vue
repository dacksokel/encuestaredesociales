<template>
  <div>
    <div>
      <header>
        <h1>
          Elija su red social Favorita asi como tambien el tiempo que le dedica a las demas en la lista
        </h1>
      </header>
      <section>
        <div>
          <label for="edad">Elija su red Social favorita:</label>
  
          <select name="redSocialfavorita" id="redSocialfavorita" v-model="favorita">
            <option v-for="(redSocial, index) in listaRedesSociales" :key="index" v-bind:value="redSocial">{{ redSocial }}</option>
          </select>
        </div>
        <div>
          <header>
            <h3>
              En las siguientes redes Sociales Cuanto tiempo pasas en el dia:
            </h3>
          </header>
          <div>
            <ul>
              <li v-for="(redes, index) in listaRedesSociales2" :key="index">
                <div>
                  <div class="imagen">
                    <img :src="redes.imagen" :alt="redes.nombre">
                  </div>
                  <div class="tiempoRed">
                    <p>Tiempo promedio al día que usas {{redes.nombre}}:</p>
                    <p>
                      <input type="number" placeholder="ingresa el tiempo que le dedicas a estas redes sociales" v-model="redes.tiempo">
                    </p>
                  </div>
                </div>
                <!-- <div>
                  <button @click="refrescar">Guardar Datos</button>
                </div> -->
              </li>
            </ul>
          </div>
        </div>
      </section>

    </div>
    <div>
      <button @click="refrescar">Terminar</button>
    </div>
  </div>
</template>

<script>
export default {
  props:['siguiente'],
  data() {
    return {
      favorita: '',
      listaRedesSociales: [
        "Facebook",
        "Youtube",
        "Whatsapp",
        "Facebook Messenger",
        "WeChat",
        "Instagram",
        "QQ",
        "Tumblr",
        "Qzone",
        "LinkedIn",
        "VK",
        "Weibo",
        "Snapchat",
        "Twitter",
        "Reddit",
        "Baidu Tieba",
        "Skype",
        "Tagged",
        "Viber",
        "Line",
        "Soundcloud",
        "Badoo",
        "Vine",
        "Pinterest",
        "Telegram",
        "Spotify",
        "YY",
        "Google+",
        "Flickr",
        "Slideshare",
      ],
      listaRedesSociales2:[
        {
          nombre:"facebook",
          imagen:"https://upload.wikimedia.org/wikipedia/commons/thumb/c/cd/Facebook_logo_%28square%29.png/640px-Facebook_logo_%28square%29.png",
          tiempo:0
        },
        {
          nombre:"WhatsApp",
          imagen:"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png",
          tiempo:0
        },
        {
          nombre:"Twitter",
          imagen:"https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/Twitter-logo.svg/1200px-Twitter-logo.svg.png",
          tiempo:0
        },
        {
          nombre:"Instagram",
          imagen:"https://upload.wikimedia.org/wikipedia/commons/thumb/9/95/Instagram_logo_2022.svg/1200px-Instagram_logo_2022.svg.png",
          tiempo:0
        },
        {
          nombre:"Tiktok",
          imagen:"https://static.wikia.nocookie.net/logopedia/images/0/08/TikTok_icon.svg",
          tiempo:0
        },
      ]
    }
  },
  methods: {
    refrescar() {
      // una vez terminado la encuesta y que todas las cosas se hayan enviado a la api entoces se refrescara la pagina
      this.$emit('siguiente', this.favorita, this.listaRedesSociales2)
    },  
    timepoEnRedes(redes){
    console.log("🚀 ~ file: pregunta2.vue ~ line 125 ~ timepoEnRedes ~ redes", redes)
    console.log(redes.tiempo)
    console.log(redes.nombre)   

    }
  }
}
</script>

<style>
  li{
    width: 15%;
    display: inline-block;
    vertical-align: bottom;    
    text-align: center;
  }
  .imagen{
    width: 25%;
    margin: 0.5px auto;
    padding: 0;
  }
  .imagen img{
    width: 99%;  
  }
.tiempoRed{
  width: 85%;
}
  .tiempoRed input{
    width: 99%;    
  }
</style>