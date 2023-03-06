import axios from "axios";

const baseUrl = "http://192.168.1.15:8000/"
// const baseUrl = "http://localhost:8000/"

const config = {
  headers: {
    "Access-Control-Allow-Origin": "http://localhost:3000",
  },
};

export function getLanguages() {
  return axios.get(baseUrl.concat("languages"), config).then((res) => {
    return res.data;
  });
}

export function getVocabularyType(language) {
  const url = baseUrl.concat("vocabulary/type/");
  return axios.get(url.concat(language)).then((res) => {
    return res.data;
  });
}

export function getVocabulary(type) {
  const url = baseUrl.concat("vocabulary/");
  return axios.get(url.concat(type)).then((res) => {
    return res.data;
  });
}

export function getToken(usernameStr, passwordStr) {
  const url = baseUrl.concat("token");
  return axios
    .post(url, {
      username: usernameStr,
      password: passwordStr,
    })
    .then((res) => {
      return res.data;
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.error("401 Unauthorized");
        return "Unauthorized";
      } else {
        console.error(error.message);
      }
    });
}

export function insertWord(body, config) {
  const url = baseUrl.concat("insert/word");
  return axios
    .post(url, body, config)
    .then(() => {
      return "success";
    })
    .catch((error) => {
      if (error.response.status === 401) {
        console.error("401 Unauthorized");
        return "Unauthorized";
      } else {
        console.error(error.message);
      }
    });
}
