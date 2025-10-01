import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import VehicleAPI from '../../service/vehicle';

const VehicleForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || id === undefined;

  const [form, setForm] = useState({ vehicleType: '', licensePlate: '', capacity: '', status: 'AVAILABLE', driverId: '' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!isNew) {
        setLoading(true);
        const data = await VehicleAPI.getById(id);
        setForm({
          vehicleType: data.vehicleType || '',
          licensePlate: data.licensePlate || '',
          capacity: data.capacity || '',
          status: data.status || 'AVAILABLE',
          driverId: data.driverId || '',
        });
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, capacity: form.capacity ? Number(form.capacity) : null, driverId: form.driverId ? Number(form.driverId) : null };
    if (isNew) {
      await VehicleAPI.create(payload);
    } else {
      await VehicleAPI.update(id, payload);
    }
    navigate('/vehicles');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{isNew ? 'New Vehicle' : `Edit Vehicle #${id}`}</h2>
      <form onSubmit={submit}>
        <div>
          <label>Type:&nbsp;</label>
          <input value={form.vehicleType} onChange={e => setForm({ ...form, vehicleType: e.target.value })} required />
        </div>
        <div>
          <label>License Plate:&nbsp;</label>
          <input value={form.licensePlate} onChange={e => setForm({ ...form, licensePlate: e.target.value })} required />
        </div>
        <div>
          <label>Capacity (tons):&nbsp;</label>
          <input value={form.capacity} onChange={e => setForm({ ...form, capacity: e.target.value })} />
        </div>
        <div>
          <label>Status:&nbsp;</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="AVAILABLE">AVAILABLE</option>
            <option value="UNAVAILABLE">UNAVAILABLE</option>
          </select>
        </div>
        <div>
          <label>Driver ID:&nbsp;</label>
          <input value={form.driverId} onChange={e => setForm({ ...form, driverId: e.target.value })} />
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/vehicles')} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default VehicleForm;


