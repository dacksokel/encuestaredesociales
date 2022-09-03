<template>
   <header>

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Encuesta</RouterLink>
        <RouterLink to="/estadisticas">Estadisticas</RouterLink>
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
          title: 'Hello World',
          description:'ahahahahaha work'
        }
      }
    }
  </script>
  <style>
    
  </style>