<template>
  <div id="contenedor">
    <!-- aqui se iran poniendo los componentes de encuestas que son 3 basicamente uno para dar 
      comienzo a la prueba, otro para preguntar correo Nombre del usuario edad y sexo del participante
      en el ultimo sera un catalogo de redes sociales, las cuales tambien se podra agregar redes sociales quie no estan dentro de la lista
      predeterminada y alli los encuestado tendran la opcion de escojer su red social favorita asi como de asignar el tiempo de uso
      esto se guardara en una base de dato, ya que el usuario contara con la opcion de editar sus datos si coloca el mismo correo
    -->
    <Start v-if="!start" v-on:start="start_encuestas" />
    <Pregunta1 v-if="pregunta1V" v-on:siguiente="pregunta1_encuesta" />
    <Pregunta2 v-if="pregunta2V" v-on:siguiente="graciasActivo" />
    <Gracias v-if="graciasV" :encuestado="encuestado"/>

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
        correo: '',
        nombre: '',
        edad: '',
        sexo: '',
        redfav: '',
        redesTiempo: {}
      }
    }
  },
  components: {
    Start,
    Pregunta1,
    Pregunta2,
    Gracias
  },
  methods: {
    start_encuestas() {
      this.start = !this.start
      this.pregunta1V = true
    },
    pregunta1_encuesta(nombre, correo, edadRango, sexo) {
      this.encuestado.nombre = nombre
      this.encuestado.correo = correo
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