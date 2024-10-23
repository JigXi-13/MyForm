import { FETCH_ALL, CREATE, UPDATE, DELETE } from '../constants/actionType';

import * as api from '../api/index.js';

export const getForms = () => async (dispatch) => {
  try {
    const { data } = await api.fetchForms();

    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const createForm = (form) => async (dispatch) => {
  try {
    const { data } = await api.createForm(form);

    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const updateForm = (id, form) => async (dispatch) => {
  try {
    const { data } = await api.updateForm(id, form);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteForm = (id) => async (dispatch) => {
  try {
    await api.deleteForm(id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error.message);
  }
};