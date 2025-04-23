import axios from "axios";

const client = axios.create({
    baseURL: "https://6414e8c38dade07073cb2a6a.mockapi.io/api/v1"
})

export default client;