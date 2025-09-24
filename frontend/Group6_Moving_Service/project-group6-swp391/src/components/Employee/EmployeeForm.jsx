import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import EmployeeAPI from '../../service/employee';

const EmployeeForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new' || id === undefined;

  const [form, setForm] = useState({ userId: '', position: '', phone: '', status: 'ACTIVE' });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      if (!isNew) {
        setLoading(true);
        const data = await EmployeeAPI.getById(id);
        setForm({
          userId: data.userId || '',
          position: data.position || '',
          phone: data.phone || '',
          status: data.status || 'ACTIVE',
        });
        setLoading(false);
      }
    };
    load();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    const payload = { ...form, userId: form.userId ? Number(form.userId) : null };
    if (isNew) {
      await EmployeeAPI.create(payload);
    } else {
      await EmployeeAPI.update(id, payload);
    }
    navigate('/employees');
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>{isNew ? 'New Employee' : `Edit Employee #${id}`}</h2>
      <form onSubmit={submit}>
        <div>
          <label>User ID:&nbsp;</label>
          <input value={form.userId} onChange={e => setForm({ ...form, userId: e.target.value })} />
        </div>
        <div>
          <label>Position:&nbsp;</label>
          <input value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} required />
        </div>
        <div>
          <label>Phone:&nbsp;</label>
          <input value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} required />
        </div>
        <div>
          <label>Status:&nbsp;</label>
          <select value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
            <option value="ACTIVE">ACTIVE</option>
            <option value="INACTIVE">INACTIVE</option>
          </select>
        </div>
        <div style={{ marginTop: 12 }}>
          <button type="submit">Save</button>
          <button type="button" onClick={() => navigate('/employees')} style={{ marginLeft: 8 }}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;


