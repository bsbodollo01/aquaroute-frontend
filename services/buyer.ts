import { apiFetch } from "../lib/api";

export const getNearbyStations = (lat: number, lng: number, radius = 5) =>
  apiFetch(`/buyers/stations?lat=${lat}&lng=${lng}&radius=${radius}`);
