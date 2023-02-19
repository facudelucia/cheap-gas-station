import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import mapboxgl from 'mapbox-gl';
import VueSocialSharing from 'vue-social-sharing';

import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

mapboxgl.accessToken = 'pk.eyJ1IjoiZmFjdWRlbHVjaWEiLCJhIjoiY2xlYW4xZmRvMGRuczN3cHBjaXQ3YjEybSJ9.Nxhst_oPOQ3EJy57CEHD5g';

library.add(fas, fab)

createApp(App).use(store).use(VueSocialSharing).component("font-awesome-icon", FontAwesomeIcon).mount('#app')
