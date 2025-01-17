import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/army'
});

export const getPlayers = () => api.get('/players');
export const getActivePlayers = () => api.get('/players/active');
export const addPlayer = (player) => api.post('/players', player);
export const activatePlayer = (id) => api.patch(`/players/${id}/activate`);
export const deactivatePlayer = (id) => api.patch(`/players/${id}/deactivate`); 