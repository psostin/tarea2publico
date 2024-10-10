import React from 'react';

const FlightsTable = ({ flights }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID Vuelo</th>
            <th>Aeropuerto de Origen</th>
            <th>Ciudad de Origen</th>
            <th>País de Origen</th>
            <th>Aeropuerto de Destino</th>
            <th>Ciudad de Destino</th>
            <th>País de Destino</th>
            <th>Fecha de Salida</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((flight, index) => (
            <tr key={index}>
              <td>{flight.id}</td>
              <td>{flight.departure.name}</td>
              <td>{flight.departure.city.name}</td>
              <td>{flight.departure.city.country.name}</td>
              <td>{flight.destination.name}</td>
              <td>{flight.destination.city.name}</td>
              <td>{flight.destination.city.country.name}</td>
              <td>{new Date(flight.departure_date).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FlightsTable;
