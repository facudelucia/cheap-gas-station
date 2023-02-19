<template>
  <div v-show="isUserlocationReady" class="map-container" ref="mapElement" />
</template>

<script>
import { onMounted, ref, watch, computed } from "vue";
import Mapboxgl from "mapbox-gl";
import { useStore } from "vuex";

export default {
  setup() {
    const mapElement = ref();
    const store = useStore();
    const userLocation = computed(() => store.state.userLocation);
    const isUserlocationReady = computed(
      () => store.getters["isUserlocationReady"]
    );
    const setMap = (map) => store.commit("setMap", map);

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Div Element no exits");
      if (!userLocation.value) throw new Error("user location no existe");

      await Promise.resolve();

      const map = new Mapboxgl.Map({
        container: mapElement.value, // container ID
        style: "mapbox://styles/mapbox/light-v10", // style URL
        center: userLocation.value,
        zoom: 15, // starting zoom
      });

      const myLocationPopup = new Mapboxgl.Popup().setLngLat(userLocation.value)
        .setHTML(`
          <h4>This is you!</h4>
          <p>This is your current location</p>
        `);

      const myLocationMarker = new Mapboxgl.Marker({ color: "red" })
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      setMap(map);
    };

    onMounted(() => {
      if (isUserlocationReady.value) return initMap();
    });

    watch(isUserlocationReady, (newVal) => {
      if (isUserlocationReady.value) initMap();
    });

    return {
      isUserlocationReady,
      mapElement,
    };
  },
};
</script>

<style>
.map-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
}
.loading-map {
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0px;
  width: 100vw;
  z-index: 9999;
}
</style>