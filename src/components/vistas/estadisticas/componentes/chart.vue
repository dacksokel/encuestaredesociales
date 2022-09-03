<template>
    <Doughnut :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>
  
  <script>
  //   import { Doughnut } from 'vue-chartjs/legacy'
  import { Doughnut } from 'vue-chartjs'
  
  import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      ArcElement,
      CategoryScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, ArcElement, CategoryScale)
  
  export default {
      name: 'DoughnutChart',
      components: {
          Doughnut
      },
      props: {
          chartId: {
              type: String,
              default: 'doughnut-chart'
          },
          datasetIdKey: {
              type: String,
              default: 'label'
          },
          width: {
              type: Number,
              default: 400
          },
          height: {
              type: Number,
              default: 400
          },
          cssClasses: {
              default: '',
              type: String
          },
          styles: {
              type: Object,
              default: () => { }
          },
          plugins: {
              type: Array,
              default: () => []
          }
      },
      data() {
          return {
              chartData: {
                  labels: ['Facebook', 'WhatsApp', 'Twitter', 'Instagram','Tiktok'],
                  datasets: [
                      {
                          backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16',"#D6DF17"],
                          data: [40, 20, 80, 10]
                      }
                  ]
              },
              chartOptions: {
                  responsive: true,
                  maintainAspectRatio: false
              },
              promediosT: ''
          }
      },
      mounted() {
          this.promediostiempo()
  
      },
      methods: {
          async promediostiempo() {
              let res = await fetch('/encuestados/promedioredesociales')
              let dato = await res.json()
  
              this.promediosT = dato
              let datosArray = [this.promediosT.facebook, this.promediosT.whatsapp,this.promediosT.twitter, this.promediosT.instagram, this.promediosT.tiktok]              
              this.chartData.datasets[0].data = datosArray
              console.log("🚀 ~ file: chart.vue ~ line 85 ~ promediostiempo ~ this.chartData.datasets", this.chartData.datasets)
              console.log("🚀 ~ file: estadisticas.vue ~ line 51 ~ promediostiempo ~ this.promediosT ", this.promediosT)
          }
      }
  }
  </script>
  