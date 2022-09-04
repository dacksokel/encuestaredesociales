<template>
  <header>

    <div id="contenedor" class="wrapper">

      <nav>
        <RouterLink to="/"><span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-house-fill"
              viewBox="0 0 16 16">
              <path fill-rule="evenodd"
                d="m8 3.293 6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z" />
              <path fill-rule="evenodd"
                d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z" />
            </svg></span> Inicio</RouterLink>
        <RouterLink v-if="validador" to="/estadisticas">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor"
              class="bi bi-bar-chart-line-fill" viewBox="0 0 16 16">
              <path
                d="M11 2a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v12h.5a.5.5 0 0 1 0 1H.5a.5.5 0 0 1 0-1H1v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h1V7a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v7h1V2z" />
            </svg>
          </span>
          Estadisticas
        </RouterLink>
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
  #contenedor {
    text-align: center;
  }
  
  nav {
    background: #F4F6C4;
    vertical-align: middle;
  }
  
  nav a {
    padding: .5em;
    text-decoration: none;
    font-size: 25px;
  }
  </style>