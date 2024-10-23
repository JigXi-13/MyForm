import axios from 'axios';

const url = 'http://localhost:5000/forms';

export const fetchForms = () => axios.get(url);
export const createForm = (newFrom) => axios.post(url, newFrom);
export const updateForm = (id, updatedForm) => axios.patch(`${url}/${id}`, updatedForm);
export const deleteForm = (id) => axios.delete(`${url}/${id}`);