<template>
  <div v-if="cheapestStation !== undefined" class="better-choice">
    This is your better choice for today
    <p><b>Brand:</b> {{ cheapestStation.brand }}</p>
    <p><b>Name:</b> {{ cheapestStation.name }}</p>
    <p v-if="cheapestStation.price">
      <b>Price:</b> ${{ cheapestStation.price }}
    </p>
    <p v-if="cheapestStation.diesel">
      <b>Diesel:</b> ${{ cheapestStation.diesel }}
    </p>
    <p v-if="cheapestStation.e5"><b>e5:</b> ${{ cheapestStation.e5 }}</p>
    <p v-if="cheapestStation.e10"><b>e10:</b> ${{ cheapestStation.e10 }}</p>
    <ShareNetwork
      network="whatsapp"
      url=""
      :title="cheapestStation.brand"
      :description="`${cheapestStation.brand} - ${cheapestStation.name} ${
        cheapestStation.price ? `Price: $${cheapestStation.price}.` : ''
      } ${
        cheapestStation.diesel ? `Diesel: $${cheapestStation.diesel}, ` : ''
      } ${cheapestStation.e5 ? `e5: $${cheapestStation.e5}, ` : ''} ${
        cheapestStation.e10 ? `e10: $${cheapestStation.e10}.` : ''
      }`"
    >
      <button>Share! <font-awesome-icon :icon="['fab', 'whatsapp']" /></button>
    </ShareNetwork>
  </div>
</template>

<script>
export default {
  name: "BetterChoice",
  props: {
    cheapestStation: Object,
  },
};
</script>

<style scoped>
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

.better-choice {
  background-color: white;
  border-radius: 10px;
  border: 1px solid gray;
  padding: 10px;
}
</style>