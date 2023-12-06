import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return (request.then(response=>response.data))
}

const postEntry = (entry) => {
    const request = axios.post(baseUrl, entry)
    return (request.then(response=>response.data))
}

export default {getAll, postEntry}