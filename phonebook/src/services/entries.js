import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return (request.then(response=>response.data))
}

const createEntry = (entry) => {
    const request = axios.post(baseUrl, entry)
    return (request.then(response=>response.data))
}

const deleteEntry = (id) => {
    console.log('deleting',id,name)
    const request = axios.delete(`${baseUrl}/${id}`)
    return (request.then(response => response))
}

export default {getAll, createEntry, deleteEntry}