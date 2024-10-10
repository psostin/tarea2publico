import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Íconos personalizados para los aeropuertos y aviones
const airplaneIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + '/icons/plane.png',
  iconSize: [40, 40],
  iconAnchor: [20, 20],
  popupAnchor: [0, -20]
});

const departureIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + '/icons/departure_airport.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

const destinationIcon = new L.Icon({
  iconUrl: process.env.PUBLIC_URL + '/icons/red_pin.png',
  iconSize: [30, 30],
  iconAnchor: [15, 15],
  popupAnchor: [0, -15]
});

const MapComponent = ({ flights = [], planes = {} }) => {
  return (
    <MapContainer center={[0, 0]} zoom={2} style={{ height: '400px', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Renderizar los aeropuertos y sus rutas */}
      {flights.map((flight, index) => (
        <React.Fragment key={index}>
          {/* Marcador para el aeropuerto de salida */}
          <Marker
            position={[flight.departure.location.lat, flight.departure.location.long]}
            icon={departureIcon}
          >
            <Popup>
              <div>
                <p><strong>Aeropuerto de Salida:</strong> {flight.departure.name}</p>
                <p><strong>Ciudad:</strong> {flight.departure.city.name}, {flight.departure.city.country.name}</p>
                <p><strong>ID Vuelo:</strong> {flight.id}</p>
              </div>
            </Popup>
          </Marker>

          {/* Marcador para el aeropuerto de destino */}
          <Marker
            position={[flight.destination.location.lat, flight.destination.location.long]}
            icon={destinationIcon}
          >
            <Popup>
              <div>
                <p><strong>Aeropuerto de Destino:</strong> {flight.destination.name}</p>
                <p><strong>Ciudad:</strong> {flight.destination.city.name}, {flight.destination.city.country.name}</p>
                <p><strong>ID Vuelo:</strong> {flight.id}</p>
              </div>
            </Popup>
          </Marker>

          {/* Línea que representa la ruta del vuelo */}
          <Polyline
            positions={[
              [flight.departure.location.lat, flight.departure.location.long],
              [flight.destination.location.lat, flight.destination.location.long]
            ]}
            color="blue"
          />
        </React.Fragment>
      ))}

      {/* Renderizar aviones y su desplazamiento en tiempo real */}
      {Object.values(planes).map((plane, index) => (
        <React.Fragment key={index}>
          {/* Marcador para la posición actual del avión */}
          <Marker
            position={[plane.info.position.lat, plane.info.position.long]}
            icon={airplaneIcon}
          >
            <Popup>
              <div>
                <p><strong>ID Vuelo:</strong> {plane.info.flight_id}</p>
                <p><strong>Aerolínea:</strong> {plane.info.airline.name}</p>
                <p><strong>Capitán:</strong> {plane.info.captain}</p>
                <p><strong>ETA:</strong> {plane.info.ETA}</p>
                <p><strong>Estado:</strong> {plane.info.status}</p>
              </div>
            </Popup>
          </Marker>

          {/* Línea que muestra el desplazamiento realizado por el avión */}
          <Polyline
            positions={plane.positions.map(pos => [pos.lat, pos.long])}
            color="red"
          />
        </React.Fragment>
      ))}
    </MapContainer>
  );
};

export default MapComponent;
