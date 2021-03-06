import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faBackspace } from "@fortawesome/free-solid-svg-icons";

library.add(faBackspace);

import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";


createApp(App).use(router).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
