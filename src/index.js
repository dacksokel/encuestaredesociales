// import Vue from 'vue';
// import App from './components/App.vue';

// new Vue({
//   render: h => h(App)
// }).$mount('#app');
import { createApp } from 'vue'
// import { createPinia } from 'pinia'

import App from './components/App.vue'
// import router from './router'

// import './assets/main.css'

const app = createApp(App)

// app.use(createPinia())
// app.use(router)

app.mount('#app')
