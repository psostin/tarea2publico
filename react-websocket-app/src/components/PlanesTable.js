import React from 'react';

const PlanesTable = ({ planes }) => {
  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>ID Vuelo</th>
            <th>Aerolínea</th>
            <th>Capitán</th>
            <th>Latitud</th>
            <th>Longitud</th>
            <th>ETA</th>
            <th>Distancia al Destino</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {Object.values(planes).map((plane, index) => (
            <tr key={index}>
              <td>{plane.info.flight_id}</td>
              <td>{plane.info.airline.name}</td>
              <td>{plane.info.captain}</td>
              <td>{plane.info.position.lat}</td>
              <td>{plane.info.position.long}</td>
              <td>{plane.info.ETA.toFixed(2)} horas</td>
              <td>{plane.info.distance.toFixed(2)} km</td>
              <td>{plane.info.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlanesTable;
