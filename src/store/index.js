import Mapboxgl from 'mapbox-gl';
import { createStore } from 'vuex'
import gasStationApi from '../../api/gasStationApi'

export default createStore({
  state: {
    map: undefined,
    stations: [],
    userLocation: undefined,
    cheapestStation: undefined
  },
  getters: {
    isMapReady(state) {
      return !!state.map;
    },
    isUserlocationReady(state) {
      return !!state.userLocation;
    }
  },
  mutations: {
    setMap(state, map) {
      state.map = map;
    },
    setStations(state, stations) {
      state.stations.forEach(marker => marker.remove());
      state.stations = [];
      if (!state.map) return;
      for (const [index, station] of stations.entries()) {
        const popup = new Mapboxgl.Popup()
          .setLngLat([station.lng, station.lat])
          .setHTML(`
              ${index === 0 ? `<h4>This is the better option!</h4>` : ''}
              <h4>Name: ${station.name}</h4>
              <p>Brand: ${station.brand}</p>
              ${station.price ? `<p>Price: $${station.price}</p>` : ''}
              ${station.diesel ? `<p>Diesel: $${station.diesel}</p>` : ''}
              ${station.e5 ? `<p>e5: $${station.e5}</p>` : ''}
              ${station.e10 ? `<p>e10: $${station.e10}</p>` : ''}
        `);
        const marker = new Mapboxgl.Marker()
          .setLngLat([station.lng, station.lat])
          .setPopup(popup)
          .addTo(state.map);

        state.stations.push(marker);
      }
    },
    setLngLat(state, { lng, lat }) {
      state.userLocation = [lng, lat];
    },
    setCheapestStation(state, station) {
      state.cheapestStation = station
    }
  },
  actions: {
    async getStations({ commit }, search) {
      const { type, brand } = search;
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { longitude, latitude } = position.coords;
        commit('setLngLat', { lng: longitude, lat: latitude });
        const resp = await gasStationApi.get('/list.php', {
          params: {
            lat: latitude,
            lng: longitude,
            rad: '25',
            sort: 'dist',
            type: type || 'all',
            apikey: '00000000-0000-0000-0000-000000000002'
          }
        });
        const openStations = resp.data.stations.filter(station => station.isOpen);
        const filteredStations = brand ? openStations.filter(station => station.brand === brand) : openStations;
        commit('setStations', filteredStations);
        commit('setCheapestStation', filteredStations[0]);
      } catch (error) {
        const defaultLngLat = { lng: '13.438', lat: '52.521' };
        commit('setLngLat', defaultLngLat);
        const resp = await gasStationApi.get('/list.php', {
          params: {
            lat: defaultLngLat.lat,
            lng: defaultLngLat.lng,
            rad: '25',
            sort: 'dist',
            type: type || 'all',
            apikey: '00000000-0000-0000-0000-000000000002'
          }
        });
        const openStations = resp.data.stations.filter(station => station.isOpen);
        const filteredStations = brand ? openStations.filter(station => station.brand === brand) : openStations;
        commit('setStations', filteredStations);
        commit('setCheapestStation', filteredStations[0]);
      }
    },
  },
  modules: {
  }
})
