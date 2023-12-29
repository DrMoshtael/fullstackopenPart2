import axios from 'axios'

const baseUrl = '/api/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return (request.then(response=>response.data))
}

const createEntry = (entry) => {
    const request = axios.post(baseUrl, entry)
    return (request.then(response=>response.data))
}

const deleteEntry = (id) => {
    console.log('deleting',id)
    const request = axios.delete(`${baseUrl}/${id}`)
    return (request.then(response => response))
}

const replaceEntry = (id,entry) => {
    console.log('replacing',id)
    const request = axios.put(`${baseUrl}/${id}`,entry)
    return (request.then(response=>response.data))
}

export default {getAll, createEntry, deleteEntry, replaceEntry}