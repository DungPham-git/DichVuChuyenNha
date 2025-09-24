import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import EmployeeAPI from '../../service/employee';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchData = async () => {
    try {
      setLoading(true);
      const data = await EmployeeAPI.getAll();
      setEmployees(data);
    } catch (e) {
      setError('Failed to load employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onDelete = async (id) => {
    if (!window.confirm('Delete this employee?')) return;
    try {
      await EmployeeAPI.remove(id);
      fetchData();
    } catch (e) {
      alert('Delete failed');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: 16 }}>
      <h2>Employees</h2>
      <Link to="/employees/new">+ New Employee</Link>
      <table border="1" cellPadding="8" cellSpacing="0" style={{ width: '100%', marginTop: 12 }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Position</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(e => (
            <tr key={e.employeeId}>
              <td>{e.employeeId}</td>
              <td>{e.username || '-'}</td>
              <td>{e.position}</td>
              <td>{e.phone}</td>
              <td>{e.status}</td>
              <td>
                <Link to={`/employees/${e.employeeId}`}>Edit</Link>
                {' | '}
                <Link to={`/employees/${e.employeeId}/history`}>History</Link>
                {' | '}
                <button onClick={() => onDelete(e.employeeId)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;


