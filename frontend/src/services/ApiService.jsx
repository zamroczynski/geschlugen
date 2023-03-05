import axios from "axios";
import { useState } from "react";


const config = {
  headers:{
    "Access-Control-Allow-Origin": "http://localhost:3000"
  }
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

// export function getLanguages() {
//   const [languages, setLanguages] = useState([]);
//   const fetchLanguages = async () => {
//     const response = await fetch("http://127.0.0.1:8000/languages")
//     const languages = await response.json()
//     setLanguages(languages.data)
//   };
//   return languages;
// }

export async function getVocabulary(type) {
  const url = "http://127.0.0.1:8000/vocabulary/";
  return await axios.get(url.concat(type)).then((res) => {
    return res.data;
  });
}

// export  function addpatient(patient) {
// return axios.post('http://127.0.0.1:8000/patient/',
// {
//     patient_id: null,
//     first_name: patient.first_name.value,
//     last_name: patient.last_name.value,
//     blood: patient.blood.value,
// })
// .then(res => {
//     return res.data
// })}
