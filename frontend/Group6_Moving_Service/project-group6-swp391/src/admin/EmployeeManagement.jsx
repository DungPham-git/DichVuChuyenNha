import React, { useEffect, useMemo, useState } from "react";
import { fetchEmployees, createEmployee, updateEmployee, deleteEmployee, fetchEmployeeHistory } from "../service/employee";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ position: "", phone: "", status: "" });
  const [editingId, setEditingId] = useState(null);
  const [historyForId, setHistoryForId] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchEmployees();
      setEmployees(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (editingId) {
      await updateEmployee(editingId, form);
    } else {
      await createEmployee(form);
    }
    setForm({ position: "", phone: "", status: "" });
    setEditingId(null);
    await load();
  };

  const onEdit = (emp) => {
    setEditingId(emp.employeeId);
    setForm({ position: emp.position || "", phone: emp.phone || "", status: emp.status || "" });
  };

  const onDelete = async (id) => {
    await deleteEmployee(id);
    await load();
  };

  const openHistory = async (id) => {
    setHistoryForId(id);
    const items = await fetchEmployeeHistory(id);
    setHistoryItems(items);
  };

  const closeHistory = () => {
    setHistoryForId(null);
    setHistoryItems([]);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Quản lý Nhân viên</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 380, marginBottom: 16 }}>
        <input placeholder="Vị trí" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} />
        <input placeholder="SĐT" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
        <input placeholder="Trạng thái" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm mới"}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ position: "", phone: "", status: "" }); }}>Huỷ chỉnh sửa</button>
        )}
      </form>

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>ID</th>
              <th style={{ textAlign: "left" }}>Tên</th>
              <th style={{ textAlign: "left" }}>Vị trí</th>
              <th style={{ textAlign: "left" }}>SĐT</th>
              <th style={{ textAlign: "left" }}>Trạng thái</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((e) => (
              <tr key={e.employeeId}>
                <td>{e.employeeId}</td>
                <td>{e.username || "-"}</td>
                <td>{e.position}</td>
                <td>{e.phone}</td>
                <td>{e.status}</td>
                <td style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  <button onClick={() => onEdit(e)}>Sửa</button>
                  <button onClick={() => onDelete(e.employeeId)}>Xoá</button>
                  <button onClick={() => openHistory(e.employeeId)}>Lịch sử</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {historyForId && (
        <div style={{ position: "fixed", inset: 0, background: "#00000066" }} onClick={closeHistory}>
          <div style={{ background: "white", padding: 16, maxWidth: 600, margin: "64px auto" }} onClick={(e) => e.stopPropagation()}>
            <h3>Lịch sử tham gia hợp đồng - Nhân viên {historyForId}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Mã hợp đồng</th>
                  <th style={{ textAlign: "left" }}>Ngày phân công</th>
                  <th style={{ textAlign: "left" }}>Trạng thái HĐ</th>
                </tr>
              </thead>
              <tbody>
                {historyItems.map((h, idx) => (
                  <tr key={idx}>
                    <td>{h.contractId}</td>
                    <td>{h.assignedTime}</td>
                    <td>{h.contractStatus}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ textAlign: "right", marginTop: 12 }}>
              <button onClick={closeHistory}>Đóng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
