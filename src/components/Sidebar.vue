<template>
  <div class="hamburger-sidebar" :class="{ active: isActive }">
    <form @submit.prevent="handleSubmit">
      <label for="brand">Brand:</label>
      <input type="text" id="brand" v-model="selectedBrand" />
      <label for="type">Type:</label>
      <select id="type" v-model="selectedType">
        <option v-for="(type, index) in types" :key="index" :value="type">
          {{ type }}
        </option>
      </select>
      <button type="submit" :disabled="disabledButton">Search</button>
      <button type="button" @click="resetForm" :disabled="disabledButton">
        Reset
      </button>
    </form>
    <BetterChoice :cheapestStation="cheapestStation" />
  </div>
  <div class="hamburger-icon" @click="toggleSidebar">
    <span></span>
    <span></span>
    <span></span>
  </div>
</template>

<script>
import { ref } from "@vue/reactivity";
import { useStore } from "vuex";
import { computed, watch } from "@vue/runtime-core";
import BetterChoice from "./BetterChoice.vue";
export default {
  components: {
    BetterChoice,
  },
  setup() {
    const isActive = ref(false);
    const selectedBrand = ref("");
    const types = ["e5", "e10", "diesel", "all"];
    const selectedType = ref("");
    const store = useStore();

    const cheapestStation = computed(() => store.state.cheapestStation);
    const disabledButton = computed(() => {
      return selectedBrand.value === "" && selectedType.value === "";
    });

    const toggleSidebar = () => {
      isActive.value = !isActive.value;
    };

    const resetForm = () => {
      selectedBrand.value = "";
      selectedType.value = "";
      store.dispatch("getStations", { type: "", brand: "" });
    };

    const handleSubmit = () => {
      store.dispatch("getStations", {
        type: selectedType.value,
        brand: selectedBrand.value,
      });
    };

    watch(cheapestStation, (newVal) => {});

    return {
      isActive,
      selectedBrand,
      types,
      selectedType,
      toggleSidebar,
      handleSubmit,
      resetForm,
      cheapestStation,
      disabledButton,
    };
  },
};
</script>

<style scoped>
.hamburger-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 250px;
  background-color: #f2f2f2;
  padding: 20px;
  transition: transform 0.3s ease-in-out;
  transform: translateX(-100%);
  font-family: Arial, Helvetica, sans-serif;
}

.hamburger-sidebar.active {
  transform: translateX(0);
}

.hamburger-icon {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 9999;
  cursor: pointer;
}

.hamburger-icon span {
  display: block;
  height: 3px;
  width: 25px;
  background-color: #333;
  margin: 5px 0;
}

form {
  margin-top: 50px;
}

label {
  display: block;
  font-weight: bold;
  margin-bottom: 10px;
}

select {
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

input {
  width: 91%;
  padding: 10px;
  margin-bottom: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-bottom: 20px;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.better-choice {
  background-color: white;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 10px;
}
</style>