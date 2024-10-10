import React, { useEffect, useState } from 'react';
import ReconnectingWebSocket from 'reconnecting-websocket';
import MapComponent from './MapComponent';
import FlightsTable from './FlightsTable';
import PlanesTable from './PlanesTable';
import ChatBox from './ChatBox';
import NotificationBubble from './NotificationBubble';
import '../App.css';

const WebSocketComponent = () => {
  const [flights, setFlights] = useState([]);
  const [planes, setPlanes] = useState({});
  const [messages, setMessages] = useState([]);
  const [notification, setNotification] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const options = { reconnectInterval: 3000 };
    const newSocket = new ReconnectingWebSocket('wss://tarea-2.2024-2.tallerdeintegracion.cl/connect', [], options);
    setSocket(newSocket);

    newSocket.onopen = () => {
      console.log('WebSocket connected');
      newSocket.send(JSON.stringify({ type: 'join', id: '19638469', username: 'pedrosostin' }));
    };

    newSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === 'flights') {
        const sortedFlights = Object.values(data.flights).sort((a, b) => {
          if (a.departure.name < b.departure.name) return -1;
          if (a.departure.name > b.departure.name) return 1;
          if (a.destination.name < b.destination.name) return -1;
          if (a.destination.name > b.destination.name) return 1;
          return 0;
        });
        setFlights(sortedFlights);
      } else if (data.type === 'plane') {
        setPlanes((prevPlanes) => {
          const updatedPlanes = { ...prevPlanes };
          const { flight_id, position } = data.plane;

          if (!updatedPlanes[flight_id]) {
            updatedPlanes[flight_id] = {
              positions: [],
              info: data.plane,
            };
          }

          updatedPlanes[flight_id].positions.push(position);
          updatedPlanes[flight_id].info = data.plane;

          return updatedPlanes;
        });
      } else if (data.type === 'message') {
        const { name, content } = data.message;
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: name, content: content },
        ]);
      } else if (data.type === 'take-off' || data.type === 'landing') {
        const eventMessage = data.type === 'take-off'
          ? `Flight ${data.flight_id} has taken off.`
          : `Flight ${data.flight_id} has landed.`;
        setNotification(eventMessage);
      }
    };

    newSocket.onclose = () => {
      console.log('WebSocket disconnected');
    };

    return () => newSocket.close();
  }, []);

  const handleSendMessage = (message) => {
    if (socket) {
      const chatMessage = {
        type: 'chat',
        content: message,
      };
      socket.send(JSON.stringify(chatMessage));
    }
  };

  const handleNotificationClose = () => {
    setNotification(null);
  };

  return (
    <div>
      <div className="layout-container">
        <div className="map-container">
          <MapComponent flights={flights} planes={planes} />
        </div>
        <div className="chatbox-container">
          <ChatBox messages={messages} onSendMessage={handleSendMessage} />
        </div>
      </div>
      {notification && (
        <NotificationBubble message={notification} onClose={handleNotificationClose} />
      )}
      <h2>Tabla Informativa de Vuelos</h2>
      <FlightsTable flights={flights} />
      <h2>Tabla Informativa de Aviones en Tiempo Real</h2>
      <PlanesTable planes={planes} />
    </div>
  );
};

export default WebSocketComponent;
