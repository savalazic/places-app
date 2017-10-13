import axios from 'axios';
import config from '../config.json';

const API_URL = config.apiUrl;

export function fetchEvents() {
  const request = axios.get(`${API_URL}/events`);
  return {
    type: 'FETCH_EVENTS',
    payload: request,
  };
}

export function fetchPlaces() {
  const request = axios.get(`${API_URL}/places`);
  return {
    type: 'FETCH_PLACES',
    payload: request,
  };
}

export function createPlace(values) {
  const request = axios.post(`${API_URL}/places`, values);
  return {
    type: 'CREATE_PLACE',
    payload: request,
  };
}

export function createEvent(values, callback) {
  const request = axios.post(`${API_URL}/events`, values)
    .then(() => callback());

  return {
    type: 'CREATE_EVENT',
    payload: request,
  };
}

export function deleteEvent(id, callback) {
  const request = axios.delete(`${API_URL}/events/${id}`)
    .then(() => callback());

  return {
    type: 'DELETE_EVENT',
    payload: id,
  };
}

export function deletePlace(id, callback) {
  const request = axios.delete(`${API_URL}/places/${id}`)
    .then(() => callback());

  return {
    type: 'DELETE_PLACE',
    payload: id,
  };
}

export function selectEvent(event) {
  return {
    type: 'EVENT_SELECTED',
    payload: event,
  };
}

export function eventBack() {
  return {
    type: 'EVENT_BACK',
    payload: null,
  };
}

export function onSortingChange(sorting) {
  return {
    type: 'SET_SORTING',
    payload: sorting,
  };
}

export function onShowingChangeCity(showing) {
  return {
    type: 'SET_SHOWING_CITY',
    payload: showing,
  };
}

export function onShowingChangeType(showing) {
  return {
    type: 'SET_SHOWING_TYPE',
    payload: showing,
  };
}
