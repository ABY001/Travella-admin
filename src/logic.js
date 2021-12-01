import axios from "axios";
const baseURL = "https://travelladmin.herokuapp.com/";

export default {
  get(todo) {
    return axios.get(baseURL + todo);
  },
  create(todo, payload) {
    return axios.post(baseURL + todo, payload);
  },
  update(todo, payload) {
    return axios.patch(baseURL + todo, payload);
  },
  delete(todo) {
    return axios.delete(baseURL + todo);
  }
};