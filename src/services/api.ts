import axios from 'axios';

const api = axios.create({
vp  baseURL: 'https://testeapiintranett.herokuapp.com/task',
});

export default api;
