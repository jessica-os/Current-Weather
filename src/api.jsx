import axios from "axios";

const api = axios.create({
  baseURL:
    "https://api.openweathermap.org/data/2.5/weather?&units=metric&lang=pt_brq=${input}&appid=${apiKey}`"
});

export default api;
