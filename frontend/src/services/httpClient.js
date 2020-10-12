import axios from 'axios'

const httpClient = (token) => {
  return axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export default httpClient
