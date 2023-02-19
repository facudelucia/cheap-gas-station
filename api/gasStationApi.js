import axios from 'axios'

const gasStationApi = axios.create({
    baseURL: 'https://creativecommons.tankerkoenig.de/json'
})

export default gasStationApi