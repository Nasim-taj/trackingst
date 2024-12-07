import React, { useState } from "react";
import Dashboard from "./components/Dashboard";

import RequestQuote from "./components/Request/RequestQuote";

const App = () => {
  const [currentLocation, setCurrentLocation] = useState({
    lat: 37.7749, // Default coordinates (San Francisco)
    lng: -122.4194,
    address: "San Francisco, CA"
  });

  const [destination, setDestination] = useState({
    lat: 34.0522, // Default coordinates (Los Angeles)
    lng: -118.2437,
    address: "Los Angeles, CA"
  });

  return (
    <div>
      <RequestQuote/>
       {/* Other components/pages will render below */}
      <h1>Shipment Tracking App</h1>
      <Dashboard
        currentLocation={currentLocation}
        destination={destination}
        setCurrentLocation={setCurrentLocation}
        setDestination={setDestination}
      />
      
    </div>
  );
};

export default App;