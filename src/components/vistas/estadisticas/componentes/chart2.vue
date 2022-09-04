<template>
    <Bar :chart-options="chartOptions" :chart-data="chartData" :chart-id="chartId" :dataset-id-key="datasetIdKey"
        :plugins="plugins" :css-classes="cssClasses" :styles="styles" :width="width" :height="height" />
</template>
  
  <script>
  //   import { Bar } from 'vue-chartjs/legacy'
  import { Bar } from 'vue-chartjs'
  
  
  import {
      Chart as ChartJS,
      Title,
      Tooltip,
      Legend,
      BarElement,
      CategoryScale,
      LinearScale
  } from 'chart.js'
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
      name: 'BarChart',
      components: {
          Bar
      },
      props: {
          chartId: {
              type: String,
              default: 'bar-chart'
          },
          datasetIdKey: {
              type: String,
              default: 'label'
          },
          width: {
              type: Number,
              default: 200
          },
          height: {
              type: Number,
              default: 200
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
                  labels: [
                      'January',
                      'February',
                      'March',
                      'April',
                      'May',
                      'June',
                      'July',
                      'August',
                      'September',
                      'October',
                      'November',
                      'December'
                  ],
                  datasets: [
                      {
                          label: 'Red Social Favorita ',
                          backgroundColor: '#f87979',
                          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
                      }
                  ]
              },
              chartOptions: {
                  responsive: true,
                  maintainAspectRatio: false
              }
          }
      },
      mounted() {
          this.favorita()
      },
      methods: {
          async favorita() {
              let res = await fetch('/encuestados/fav')
              let dato = await res.json()
              let labels = [], data = [], estadisticas = dato.estadisticas
              for (const key in estadisticas) {
                if (Object.hasOwnProperty.call(estadisticas, key)) {
                    const element = estadisticas[key];    
                    labels.push(key)    
                    data.push(estadisticas[key])        
                }
            }
            this.chartData.labels = labels
            this.chartData.datasets[0].data = data
            this.chartData.datasets[0].label = `Favorita: ${dato.favorita} y la menos popular es: ${dato.nopopular}`          }
      }
  }
  </script>
  