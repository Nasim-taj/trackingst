import React, { useState } from 'react';
import TrackerMap from "./trackers/TrackerMap";


const Dashboard = () => {
  const [showMap, setShowMap] = useState(false);
  const [selectedTracker, setSelectedTracker] = useState(null);

  const trackers = [
    {
      id: 1,
      currentLocation: { lat: 40.712776, long: -74.005974, address: 'New York, NY' },
      trackingData: {
        dest_lat: 34.052235,
        dest_long: -118.243683,
        Destination: 'Los Angeles, CA',
      },
    },
    {
      id: 2,
      currentLocation: { lat: 37.774929, long: -122.419418, address: 'San Francisco, CA' },
      trackingData: {
        dest_lat: 36.169941,
        dest_long: -115.139832,
        Destination: 'Las Vegas, NV',
      },
    },
  ];

  const handleTrackerClick = (tracker) => {
    setSelectedTracker(tracker);
    setShowMap(true);
  };

  return (
    <div className="dashboard">
      <h1>Shipment Dashboard</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Current Location</th>
            <th>Destination</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trackers.map((tracker) => (
            <tr key={tracker.id}>
              <td>{tracker.id}</td>
              <td>{tracker.currentLocation.address}</td>
              <td>{tracker.trackingData.Destination}</td>
              <td>
                <button onClick={() => handleTrackerClick(tracker)}>Track</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* TrackerMap Component */}
      {selectedTracker && (
        <TrackerMap
          currentLocation={{
            lat: selectedTracker.currentLocation.lat,
            lng: selectedTracker.currentLocation.long,
            address: selectedTracker.currentLocation.address,
          }}
          destination={{
            lat: selectedTracker.trackingData.dest_lat,
            lng: selectedTracker.trackingData.dest_long,
            address: selectedTracker.trackingData.Destination,
          }}
          isOpen={showMap}
          onClose={() => {
            setShowMap(false);
            setSelectedTracker(null);
          }}
        />
      )}
    </div>
  );
};

export default Dashboard;
