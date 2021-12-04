import axios from "axios";
const baseURL = "https://travelladmin.herokuapp.com/";
const token = localStorage.getItem("token");
// const string = token?.replace(/^"(.+(?="$))"$/, "$1");

export default {
  get(todo) {
    return axios.get(baseURL + todo);
  },
  create(todo, payload) {
    return axios.post(baseURL + todo, payload);
  },
  post(todo, payload) {
    console.log(token?.replace(/^"(.+(?="$))"$/, "$1"));
    return axios.post(baseURL + todo, payload, {
      headers: {
        admin_access_token: token?.replace(/^"(.+(?="$))"$/, "$1"),
      },
    });
  },
  upload(todo, payload) {
    console.log(token?.replace(/^"(.+(?="$))"$/, "$1"));
    return axios.post(baseURL + todo, payload, {
      headers: {
        admin_access_token: token?.replace(/^"(.+(?="$))"$/, "$1"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
  update(todo, payload) {
    return axios.patch(baseURL + todo, payload, {
      headers: {
        admin_access_token: token?.replace(/^"(.+(?="$))"$/, "$1"),
      },
    });
  },
  updateUpload(todo, payload) {
    return axios.patch(baseURL + todo, payload, {
      headers: {
        admin_access_token: token?.replace(/^"(.+(?="$))"$/, "$1"),
        "Content-Type": "multipart/form-data",
      },
    });
  },
  delete(todo) {
    return axios.delete(baseURL + todo, {
      headers: {
        admin_access_token: token?.replace(/^"(.+(?="$))"$/, "$1"),
      },
    });
  },
};
