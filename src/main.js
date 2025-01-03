import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { createPinia } from 'pinia';
import router from './router'; // Make sure you set up Vue Router properly
import '@fortawesome/fontawesome-free/css/all.css';
import '@fortawesome/fontawesome-free/js/all.js';


const app = createApp(App);

// Use Pinia and Vue Router
app.use(createPinia());
app.use(router);

app.mount('#app');
app.mixin({
    data() {
      return {
        isAuthenticated: false,
      };
    },
    created() {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      if (storedUser) {
        this.isAuthenticated = true;
      }
    },
  });
