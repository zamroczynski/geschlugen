import axios from "axios";

const config = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
};

export function getLanguages() {
  return axios.get("http://127.0.0.1:8000/languages", config).then((res) => {
    return res.data;
  });
}

export function getVocabularyType(language) {
  const url = "http://127.0.0.1:8000/vocabulary/type/";
  return axios.get(url.concat(language)).then((res) => {
    return res.data;
  });
}

export function getVocabulary(type) {
  const url = "http://127.0.0.1:8000/vocabulary/";
  return axios.get(url.concat(type)).then((res) => {
    return res.data;
  });
}

export function getToken(usernameStr, passwordStr) {
  return axios
    .post("http://127.0.0.1:8000/token", {
      username: usernameStr,
      password: passwordStr,
    })
    .then((res) => {
      return res.data;
    })
    .catch(error => {
      if (error.response.status === 401) {
        console.error("401 Unauthorized");
        return "Unauthorized";
      } else {
        console.error(error.message);
      }
    });
}
