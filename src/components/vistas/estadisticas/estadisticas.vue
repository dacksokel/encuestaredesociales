<template>
  <div id="conteEstadisticas">
    <header>
      <h1>Estadisticas de la encuestas</h1>
    </header>
    <section>
      <div>
        <p>Total de Encuestados: {{ totalEcuestados }}</p>
      </div>
      <div id="graficas">
        <div>
          <h2>Tiempo promedio por red social</h2>
          <Chart />
        </div>
        <div>
          <h2>
            Redes Sociales Favorita
          </h2>
          <Chart2 />
        </div>
        <div id="largo">
          <h2>
            Rango de edad que más use cada red social
          </h2>
          <ol>
            <li v-for="(redSocial, edades) in edadesrango" :key="edades">
              {{edades}}:{{redSocial}}
            </li>
          </ol>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Chart from "./componentes/chart.vue";
import Chart2 from "./componentes/chart2.vue";
export default {
  data() {
    return {
      totalEcuestados: "",
      edadesrango:{}
    };
  },
  components: {
    Chart,
    Chart2,
  },
  async mounted() {
    // acontinuacion llamamos a una apis para que nos suuministren de los datos necesarios para crear las estadisticas
    this.totalEncuestados();
    // aqui llamamos a las edades por rango para generar una lista de las mismas
    let res = await fetch("/encuestados/edadrango");
    let datos = await res.json();
    this.edadesrango = datos
  },
  methods: {
    async totalEncuestados() {
      // cantidad de encuentasdos
      let res = await fetch("/encuestados");
      let datos = await res.json();
      this.totalEcuestados = datos.cantidad;
    },
  },
};
</script>

<style>
  #conteEstadisticas{
    text-align: center;
    padding: .5em;
    margin: 0.5em;
    width: 99%;

  }
  header{
    background:#F7F7EE;
  }
#graficas {
  width: 99%;
}
p{
  font-size: 30px;
  font-weight: bold;
}
#graficas div {
  width: 45%;
  display: inline-block;
  vertical-align: middle;
  text-align: center;
  margin: .25em;
  padding:.5em;
  box-shadow: 1px 1px 4px;
}
</style>