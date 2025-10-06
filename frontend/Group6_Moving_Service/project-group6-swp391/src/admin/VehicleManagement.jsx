import React, { useEffect, useState } from "react";
import { fetchVehicles, createVehicle, updateVehicle, deleteVehicle, fetchVehicleContracts } from "../service/vehicle";

export default function VehicleManagement() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ vehicleType: "", licensePlate: "", capacity: "", status: "", driverId: "" });
  const [editingId, setEditingId] = useState(null);
  const [historyForId, setHistoryForId] = useState(null);
  const [historyItems, setHistoryItems] = useState([]);

  const load = async () => {
    setLoading(true);
    try {
      const data = await fetchVehicles();
      setVehicles(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      vehicleType: form.vehicleType,
      licensePlate: form.licensePlate,
      capacity: form.capacity ? Number(form.capacity) : null,
      status: form.status,
      driverId: form.driverId ? Number(form.driverId) : null,
    };
    if (editingId) {
      await updateVehicle(editingId, payload);
    } else {
      await createVehicle(payload);
    }
    setForm({ vehicleType: "", licensePlate: "", capacity: "", status: "", driverId: "" });
    setEditingId(null);
    await load();
  };

  const onEdit = (v) => {
    setEditingId(v.vehicleId);
    setForm({ vehicleType: v.vehicleType || "", licensePlate: v.licensePlate || "", capacity: v.capacity || "", status: v.status || "", driverId: v.driverId || "" });
  };

  const onDelete = async (id) => {
    await deleteVehicle(id);
    await load();
  };

  const openHistory = async (id) => {
    setHistoryForId(id);
    const items = await fetchVehicleContracts(id);
    setHistoryItems(items);
  };

  const closeHistory = () => {
    setHistoryForId(null);
    setHistoryItems([]);
  };

  return (
    <div style={{ padding: 16 }}>
      <h2>Quản lý Phương tiện</h2>

      <form onSubmit={onSubmit} style={{ display: "grid", gap: 8, maxWidth: 480, marginBottom: 16 }}>
        <input placeholder="Loại xe" value={form.vehicleType} onChange={(e) => setForm({ ...form, vehicleType: e.target.value })} />
        <input placeholder="Biển số" value={form.licensePlate} onChange={(e) => setForm({ ...form, licensePlate: e.target.value })} />
        <input placeholder="Sức chứa" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: e.target.value })} />
        <input placeholder="Trạng thái" value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })} />
        <input placeholder="Mã tài xế (employeeId) - tuỳ chọn" value={form.driverId} onChange={(e) => setForm({ ...form, driverId: e.target.value })} />
        <button type="submit">{editingId ? "Cập nhật" : "Thêm mới"}</button>
        {editingId && (
          <button type="button" onClick={() => { setEditingId(null); setForm({ vehicleType: "", licensePlate: "", capacity: "", status: "", driverId: "" }); }}>Huỷ chỉnh sửa</button>
        )}
      </form>

      {loading ? (
        <div>Đang tải...</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left" }}>ID</th>
              <th style={{ textAlign: "left" }}>Loại</th>
              <th style={{ textAlign: "left" }}>Biển số</th>
              <th style={{ textAlign: "left" }}>Sức chứa</th>
              <th style={{ textAlign: "left" }}>Trạng thái</th>
              <th style={{ textAlign: "left" }}>Tài xế</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {vehicles.map((v) => (
              <tr key={v.vehicleId}>
                <td>{v.vehicleId}</td>
                <td>{v.vehicleType}</td>
                <td>{v.licensePlate}</td>
                <td>{v.capacity}</td>
                <td>{v.status}</td>
                <td>{v.driverName || "-"}</td>
                <td style={{ display: "flex", gap: 8, justifyContent: "center" }}>
                  <button onClick={() => onEdit(v)}>Sửa</button>
                  <button onClick={() => onDelete(v.vehicleId)}>Xoá</button>
                  <button onClick={() => openHistory(v.vehicleId)}>Lịch sử HĐ</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {historyForId && (
        <div style={{ position: "fixed", inset: 0, background: "#00000066" }} onClick={closeHistory}>
          <div style={{ background: "white", padding: 16, maxWidth: 600, margin: "64px auto" }} onClick={(e) => e.stopPropagation()}>
            <h3>Lịch sử hợp đồng - Xe {historyForId}</h3>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr>
                  <th style={{ textAlign: "left" }}>Mã hợp đồng</th>
                  <th style={{ textAlign: "left" }}>Ngày bắt đầu</th>
                  <th style={{ textAlign: "left" }}>Ngày kết thúc</th>
                  <th style={{ textAlign: "left" }}>Trạng thái HĐ</th>
                </tr>
              </thead>
              <tbody>
                {historyItems.map((h, idx) => (
                  <tr key={idx}>
                    <td>{h.contractId}</td>
                    <td>{h.startDate}</td>
                    <td>{h.endDate}</td>
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
