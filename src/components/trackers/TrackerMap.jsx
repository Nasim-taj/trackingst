import { useState, useEffect } from 'react';
import { 
  GoogleMap, 
  useJsApiLoader, 
  DirectionsRenderer,
  MarkerF as AdvancedMarkerElement
} from '@react-google-maps/api';


const libraries = ['places', 'marker', 'routes'];

// Simple marker components without any animations
const CurrentLocationMarker = () => (
  <div style={{
    backgroundColor: '#1976D2',
    border: '2px solid white',
    borderRadius: '50%',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    📍
  </div>
);

const DestinationMarker = () => (
  <div style={{
    backgroundColor: '#D32F2F',
    border: '2px solid white',
    borderRadius: '100%',
    padding: '10px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }}>
    🎯
  </div>
);

const TrackerMap = ({ currentLocation, destination, isOpen, onClose }) => {
  const [map, setMap] = useState(null);
  const [directions, setDirections] = useState(null);
  const [showInfo, setShowInfo] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const parsedCurrentLocation = {
    lat: parseFloat(currentLocation.lat) || 0,
    lng: parseFloat(currentLocation.lng) || 0
  };

  const parsedDestination = {
    lat: parseFloat(destination.lat) || 0,
    lng: parseFloat(destination.lng) || 0
  };

  

  // Get route once when component mounts
  useEffect(() => {
    if (!isLoaded) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin: parsedCurrentLocation,
        destination: parsedDestination,
        travelMode: google.maps.TravelMode.DRIVING,
        drivingOptions: {
          departureTime: new Date()
        },
        unitSystem: google.maps.UnitSystem.IMPERIAL
      },
      (result, status) => {
        if (status === 'OK') {
          setDirections(result);
        }
      }
    );
  }, [isLoaded, parsedCurrentLocation.lat, parsedCurrentLocation.lng, 
      parsedDestination.lat, parsedDestination.lng]);

  const mapContainerStyle = {
    width: '100%',
    height: '280px'
  };

  const center = {
    lat: parsedCurrentLocation.lat,
    lng: parsedCurrentLocation.lng
  };

  if (!isOpen) return null;
  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps...</div>;

  return (
    <div className="tracker-map-modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Shipment Tracking</h3>
          <button onClick={onClose}>&times;</button>
        </div>

        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={10}
          onLoad={setMap}
          options={{
            zoomControl: true,
            mapTypeControl: false,
            streetViewControl: true,
            fullscreenControl: true
          }}
        >
          {/* Current Location Marker */}
          <AdvancedMarkerElement
            position={parsedCurrentLocation}
            title="Current Location"
            onClick={() => setShowInfo(true)}
          >
            <CurrentLocationMarker />
          </AdvancedMarkerElement>

          {/* Destination Marker */}
          <AdvancedMarkerElement
            position={parsedDestination}
            title="Destination"
          >
            <DestinationMarker />
          </AdvancedMarkerElement>

          {/* Route */}
          {directions && (
            <DirectionsRenderer
              directions={directions}
              options={{
                suppressMarkers: true,
                polylineOptions: {
                  strokeColor: '#2196F3',
                  strokeOpacity: 0.8,
                  strokeWeight: 4
                }
              }}
            />
          )}

        </GoogleMap>

        <div className="location-info">
          <div>
            <strong>Current Location: </strong>
            {currentLocation.address || `${parsedCurrentLocation.lat}, ${parsedCurrentLocation.lng}`}
          </div>
          <div>
            <strong>Destination: </strong>
            {destination.address || `${parsedDestination.lat}, ${parsedDestination.lng}`}
          </div>
          {directions && (
            <div>
              <strong>Route Info: </strong>
              Distance: {directions.routes[0].legs[0].distance.text},
              ETA: {directions.routes[0].legs[0].duration.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};



export default TrackerMap;
