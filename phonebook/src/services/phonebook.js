import axios from "axios";
const baseURL = "http://localhost:3001/";

const getAll = () => {
    return axios.get(`${baseURL}persons`)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const createEntry = (data) => {
    return axios.post(`${baseURL}persons`, data)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const updateEntry = (id, data) => {
    return axios.put(`${baseURL}persons/${id}`, data)
        .then(res => res.data)
        .catch(err => console.log(err));
}

const deleteEntry = (id) => {
    return axios.delete(`${baseURL}persons/${id}`)
        .then(res => res.data)
        .catch(err => console.log(err));
}

export { getAll, createEntry, updateEntry, deleteEntry };