import React, { useState } from 'react';
import { Map, Marker, Overlay } from 'pigeon-maps';
import icono from './assets/clima.png';
import './App.css';

const puntos = [
  { id: 1, nombre: 'Guaymaral', lat: 4.78375, lng: -74.044139 },
  { id: 2, nombre: 'Usaquén', lat: 4.71035, lng: -74.030417 },
  { id: 3, nombre: 'Suba', lat: 4.761247, lng: -74.093461 },
  { id: 4, nombre: 'Bolivia', lat: 4.735806, lng: -74.125889 },
  { id: 5, nombre: 'Las Ferias', lat: 4.6907, lng: -74.082483 },
  { id: 6, nombre: 'Centro de alto rendimiento', lat: 4.658467, lng: -74.083967 },
  { id: 7, nombre: 'Estación móvil 7ma', lat: 4.645194, lng: -74.061556 },
  { id: 8, nombre: 'MinAmbiente', lat: 4.625486, lng: -74.066981 },
  { id: 9, nombre: 'Fontibón', lat: 4.678242, lng: -74.143819 },
  { id: 10, nombre: 'Puente Aranda', lat: 4.631767, lng: -74.117483 },
  { id: 11, nombre: 'Kennedy', lat: 4.62505, lng: -74.161333 },
  { id: 12, nombre: 'Carvajal-Sevillana', lat: 4.595833, lng: -74.1485 },
  { id: 13, nombre: 'Tunal', lat: 4.576225, lng: -74.130956 },
  { id: 14, nombre: 'San Cristóbal', lat: 4.572553, lng: -74.083814 },
  { id: 15, nombre: 'El Jazmín', lat: 4.6085, lng: -74.114944 },
  { id: 16, nombre: 'Usme', lat: 4.532056, lng: -74.117139 },
  { id: 17, nombre: 'Bosa', lat: 4.605611, lng: -74.204056 },
  { id: 18, nombre: 'Ciudad Bolívar', lat: 4.577806, lng: -74.166278 },
  { id: 19, nombre: 'Colina', lat: 4.737194, lng: -74.069472 },
  { id: 20, nombre: 'Móvil Fontibón', lat: 4.668, lng: -74.1485 },
];

const App = () => {
  const [zoomMapaSuperior, setZoomMapaSuperior] = useState(11);
  const [zoomMapaInferior, setZoomMapaInferior] = useState(11);

  const handleZoomInSuperior = () => {
    setZoomMapaSuperior(prevZoom => Math.min(prevZoom + 0.5, 18)); // Límite de zoom máximo
  };

  const handleZoomOutSuperior = () => {
    setZoomMapaSuperior(prevZoom => Math.max(prevZoom - 0.5, 1)); // Límite de zoom mínimo
  };

  const handleZoomInInferior = () => {
    setZoomMapaInferior(prevZoom => Math.min(prevZoom + 0.5, 18)); // Límite de zoom máximo
  };

  const handleZoomOutInferior = () => {
    setZoomMapaInferior(prevZoom => Math.max(prevZoom - 0.5, 1)); // Límite de zoom mínimo
  };

  const getFontSize = (nombre) => {
    // Reducir el tamaño de la fuente si el nombre es muy largo
    return nombre.length > 10 ? '10px' : '12px';
  };

  return (
    <div className="App">
    <div className='app-title'><h1></h1>Estaciones de la Red de Monitoreo de Calidad del Aire de Bogotá</div>
    <div className="map-container">
        {/* Mapa superior con nombres de puntos */}
        <Map
          center={[4.710989, -74.072090]} // Centro del mapa (Bogotá)
          zoom={zoomMapaSuperior} // Nivel de zoom controlado por el estado
          width={window.innerWidth * 0.8} // Ajusta el ancho al 70% del ancho de la ventana
          height={400} // Altura fija
        >
          {puntos.map(punto => (
            <Marker
              key={punto.id}
              anchor={[punto.lat, punto.lng]}
            >
              <img src={icono} alt={punto.nombre} style={{ width: '24px', height: '24px', position: 'absolute', top: '-12px', left: '-12px', cursor: 'pointer' }} />
            </Marker>
          ))}
          {/* Add colored transparent rectangles for zones */}
          <Overlay anchor={[4.82, -74.23]} offset={[0, 0]}>
            <div style={{
              width: '650px',
              height: '250px',
              backgroundColor: 'rgba(255, 0, 0, 0.3)', // Red with transparency
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Norte</div>
          </Overlay>
          <Overlay anchor={[4.735, -74.144]} offset={[0, 0]}>
            <div style={{
              width: '150px',
              height: '395px',
              backgroundColor: 'rgba(0, 255, 0, 0.3)', // Green with transparency
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Centro</div>
          </Overlay>
          <Overlay anchor={[4.6, -74.23]} offset={[0, 0]}>
            <div style={{
              width: '650px',
              height: '250px',
              backgroundColor: 'rgba(0, 0, 255, 0.3)', // Blue with transparency
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Sur</div>
          </Overlay>
          <Overlay anchor={[4.735, -74.23]} offset={[0, 0]}>
            <div style={{
              width: '250px',
              height: '395px',
              backgroundColor: 'rgba(255, 255, 0, 0.3)', // Yellow with transparency
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Oriente</div>
          </Overlay>
          <Overlay anchor={[4.735, -74.092]} offset={[0, 0]}>
            <div style={{
              width: '250px',
              height: '395px',
              backgroundColor: 'rgba(255, 165, 0, 0.3)', // Orange with transparency
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>Occidente</div>
          </Overlay>
          {/* Controles de zoom para el mapa superior */}
          <div className="zoom-controls">
            <button onClick={handleZoomInSuperior} style={{ position: 'absolute', top: '10px', right: '10px' }}>Acercar</button>
            <button onClick={handleZoomOutSuperior} style={{ position: 'absolute', top: '40px', right: '10px' }}>Alejar</button>
          </div>
        </Map>

      </div>

    <div className="map-container">
      {/* Mapa inferior con nombres de puntos */}
      <Map
        center={[4.710989, -74.072090]} // Centro del mapa (Bogotá)
        zoom={zoomMapaInferior} // Nivel de zoom controlado por el estado
        width={window.innerWidth * 0.8} // Ajusta el ancho al 70% del ancho de la ventana
        height={400} // Altura fija
      >
        {puntos.map(punto => (
          <Marker
            key={punto.id}
            anchor={[punto.lat, punto.lng]}
          >
            <img src={icono} alt={punto.nombre} style={{ width: '24px', height: '24px', position: 'absolute', top: '-12px', left: '-12px', cursor: 'pointer' }} />
            <div style={{ position: 'absolute', top: '-30px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'white', padding: '2px 6px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', fontSize: getFontSize(punto.nombre) }}>{punto.nombre}</div>
          </Marker>
        ))}
        {/* Controles de zoom para el mapa inferior */}
        <div className="zoom-controls">
          <button onClick={handleZoomInInferior} style={{ position: 'absolute', top: '10px', right: '10px' }}>Acercar</button>
          <button onClick={handleZoomOutInferior} style={{ position: 'absolute', top: '40px', right: '10px' }}>Alejar</button>
        </div>
      </Map>
    </div>
  </div>

  );
};

export default App;