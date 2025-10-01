import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import VehicleAPI from '../../service/vehicle';

const VehicleList = () => {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await VehicleAPI.getAll();
      setVehicles(data);
    } catch (e) {
      setError('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this vehicle?')) return;
    try {
      await VehicleAPI.remove(id);
      fetchData();
    } catch (e) {
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Vehicles</h2>
      <Link to="/vehicles/new">+ New Vehicle</Link>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>License Plate</th>
            <th>Capacity</th>
            <th>Status</th>
            <th>Driver</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map(v => (
            <tr key={v.vehicleId}>
              <td>{v.vehicleId}</td>
              <td>{v.vehicleType}</td>
              <td>{v.licensePlate}</td>
              <td>{v.capacity}</td>
              <td>{v.status}</td>
              <td>{v.driverName || '-'}</td>
              <td>
                <Link to={`/vehicles/${v.vehicleId}`}>Edit</Link>
                {' | '}
                <Link to={`/vehicles/${v.vehicleId}/history`}>History</Link>
                {' | '}
                <button onClick={() => onDelete(v.vehicleId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VehicleList;


