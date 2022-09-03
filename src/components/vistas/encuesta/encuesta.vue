<template>
  <div id="contenedor">
    <!-- aqui se iran poniendo los componentes de encuestas que son 3 basicamente uno para dar 
      comienzo a la prueba, otro para preguntar correo Nombre del usuario edad y sexo del participante
      en el ultimo sera un catalogo de redes sociales, las cuales tambien se podra agregar redes sociales quie no estan dentro de la lista
      predeterminada y alli los encuestado tendran la opcion de escojer su red social favorita asi como de asignar el tiempo de uso
      esto se guardara en una base de dato, ya que el usuario contara con la opcion de editar sus datos si coloca el mismo correo
    -->
    <Start v-if="!start" v-on:start="start_encuestas" />
    <Pregunta1 v-if="pregunta1V"  v-on:siguiente="pregunta1_encuesta" />
    <Pregunta2 v-if="pregunta2V"/>

  </div>
</template>

<script>
import Start from './componentes/start.vue'
import Pregunta1 from './componentes/pregunta1.vue'
import Pregunta2 from './componentes/pregunta2.vue'

export default {
  data() {
    return {
      start: false,
      pregunta1V: false,
      pregunta2V: false,
    }
  },
  components:{
    Start,
    Pregunta1,  
    Pregunta2,  
},
  methods: {
    start_encuestas() {
      this.start = !this.start
      console.log("🚀 ~ file: encuesta.vue ~ line 33 ~ start_encuestas ~ start", this.start)
      this.pregunta1V = true
    },
    pregunta1_encuesta(){
      this.pregunta1V = !this.pregunta1V
      console.log("🚀 ~ file: encuesta.vue ~ line 38 ~ pregunta1_encuesta ~ this.pregunta1V ", this.pregunta1V )
      this.pregunta2V = true
    }
  }
}
</script>

<style>
</style>