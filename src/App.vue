<template>
  <Map />
  <Sidebar />
</template>

<script>
import Map from "@/components/Map.vue";
import Sidebar from "@/components/Sidebar.vue";
import { useStore } from "vuex";
export default {
  name: "App",
  components: {
    Map,
    Sidebar,
  },
  setup() {
    const store = useStore();
    store.dispatch("getStations", { type: "", brand: "" });
  },
};
</script>

<style>
</style>
