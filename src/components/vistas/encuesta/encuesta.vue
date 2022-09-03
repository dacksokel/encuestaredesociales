<template>
  <div id="contenedor">
    <!-- aqui se iran poniendo los componentes de encuestas que son 3 basicamente uno para dar 
      comienzo a la prueba, otro para preguntar correo Nombre del usuario edad y sexo del participante
      en el ultimo sera un catalogo de redes sociales, las cuales tambien se podra agregar redes sociales quie no estan dentro de la lista
      predeterminada y alli los encuestado tendran la opcion de escojer su red social favorita asi como de asignar el tiempo de uso
      esto se guardara en una base de dato, ya que el usuario contara con la opcion de editar sus datos si coloca el mismo correo
    -->
    <Start v-if="!start" v-on:start="start_encuestas"/>
    <Pregunta1 v-if="pregunta1V" v-on:siguiente="pregunta1_encuesta" :done="encuestaDone" :datosE="encuestado"/>
    <Pregunta2 v-if="pregunta2V" v-on:siguiente="graciasActivo" :done="encuestaDone"  :datosE="encuestado"/>
    <Gracias v-if="graciasV" :encuestado="encuestado" :done="encuestaDone"/>

  </div>
</template>

<script>
import Start from './componentes/start.vue'
import Pregunta1 from './componentes/pregunta1.vue'
import Pregunta2 from './componentes/pregunta2.vue'
import Gracias from './componentes/gracias.vue'

export default {
  data() {
    return {
      start: false,
      pregunta1V: false,
      pregunta2V: false,
      graciasV: false,
      encuestado: {
        correo: 'prueba@prueba.com',
        nombre: 'prueba',
        edad: '123',
        sexo: 'f',
        redfav: 'adasd',
        redesTiempo: { hola: 'caho' }
      },
      encuestaDone:false
    }
  },
  components: {
    Start,
    Pregunta1,
    Pregunta2,
    Gracias
  },
  methods: {
    async start_encuestas(correo) {
      console.log("🚀 ~ file: encuesta.vue ~ line 50 ~ tart_encuestas ~ correo", correo)
      this.encuestado.correo = correo
      this.start = !this.start

      let res = await fetch(`/encuestados/validarencuestado`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.encuestado),
      });
      let dato = await res.json()
      console.log("🚀 ~ file: gracias.vue ~ line 26 ~ mounted ~ dato", dato)

      if(dato.respuesta){
        this.encuestado = dato.datos
        console.log("🚀 ~ file: encuesta.vue ~ line 68 ~ pregunta1_encuesta ~  this.encuestado ",  this.encuestado )

        this.pregunta1V = !this.pregunta1V
        this.pregunta2V = true
        this.encuestaDone = true
      }else{
        this.pregunta1V = !this.pregunta1V
      }
    },
    pregunta1_encuesta(nombre, edadRango, sexo) {
      this.encuestado.nombre = nombre
      this.encuestado.edad = edadRango
      this.encuestado.sexo = sexo
      this.pregunta1V = !this.pregunta1V
      this.pregunta2V = true
    },
    graciasActivo(fav, tiempoRed) {
      this.encuestado.redfav = fav
      this.encuestado.redesTiempo = tiempoRed
      this.pregunta2V = false
      this.graciasV = true
    }
  }
}
</script>

<style>
</style>