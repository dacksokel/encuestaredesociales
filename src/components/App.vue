<template>
  <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Inicio</RouterLink>
        <RouterLink v-if="validador" to="/estadisticas">Estadisticas</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
  
  <script>
import { RouterLink, RouterView } from 'vue-router'

export default {
  data() {
    return {
      validador:false
    }
  },
  async mounted(){
    let res = await fetch("/encuestados");
      let datos = await res.json();
      if(datos.cantidad > 0){
        this.validador = true
      }
  }
}
</script>
  <style>
  </style>