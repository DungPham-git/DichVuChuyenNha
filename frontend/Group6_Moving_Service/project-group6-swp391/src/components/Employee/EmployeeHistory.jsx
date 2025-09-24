import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import EmployeeAPI from '../../service/employee';

const EmployeeHistory = () => {
  const { id } = useParams();
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const data = await EmployeeAPI.history(id);
      setItems(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Employee #{id} - Assignment History</h2>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th>Contract ID</th>
            <th>Assigned Time</th>
            <th>Contract Status</th>
          </tr>
        </thead>
        <tbody>
          {items.map((it, idx) => (
            <tr key={idx}>
              <td>{it.contractId}</td>
              <td>{it.assignedTime}</td>
              <td>{it.contractStatus}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: 12 }}>
        <Link to="/employees">Back</Link>
      </div>
    </div>
  );
};

export default EmployeeHistory;


