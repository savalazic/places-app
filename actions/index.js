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
