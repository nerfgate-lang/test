import { useState } from "react";

const NAV_LINKS = ["Dashboard", "Asset Registry", "Maintenance Logs", "Generate QR"];

const INITIAL_ASSETS = [
  { id: "AST-0001", name: "Dell Laptop", room: "Room 101", status: "Active" },
  { id: "AST-0002", name: "Epson Projector", room: "Room 203", status: "Active" },
  { id: "AST-0003", name: "HP Printer", room: "Faculty Office", status: "Under Repair" },
  { id: "AST-0004", name: "Desktop Computer", room: "Computer Lab A", status: "Active" },
  { id: "AST-0005", name: "CCTV Camera", room: "Hallway 2F", status: "Inactive" },
  { id: "AST-0006", name: "Smart TV 55\"", room: "Room 105", status: "Active" },
  { id: "AST-0007", name: "Electric Fan", room: "Library", status: "Active" },
  { id: "AST-0008", name: "Air Conditioner", room: "Principal's Office", status: "Under Repair" },
  { id: "AST-0009", name: "Whiteboard", room: "Room 302", status: "Active" },
  { id: "AST-0010", name: "Document Camera", room: "Room 204", status: "Inactive" },
];

const STATUS_COLORS: Record<string, string> = {
  Active: "bg-green-100 text-green-800",
  "Under Repair": "bg-yellow-100 text-yellow-800",
  Inactive: "bg-red-100 text-red-800",
};

type Asset = typeof INITIAL_ASSETS[0];

export default function App() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const [assets, setAssets] = useState<Asset[]>(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [newAsset, setNewAsset] = useState({ id: "", name: "", room: "", status: "Active" });
  const [qrAsset, setQrAsset] = useState<Asset | null>(null);

  const handleAddAsset = () => {
    if (!newAsset.name || !newAsset.room) return;
    const id = `AST-${String(assets.length + 1).padStart(4, "0")}`;
    setAssets([...assets, { ...newAsset, id }]);
    setNewAsset({ id: "", name: "", room: "", status: "Active" });
    setShowModal(false);
  };

  const handleDelete = (id: string) => {
    setAssets(assets.filter((a) => a.id !== id));
    if (qrAsset?.id === id) setQrAsset(null);
  };

  const handleQrPreview = (asset: Asset) => {
    setQrAsset(asset);
  };

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden font-mono" style={{ background: "#f3f4f6" }}>
      {/* TOP HEADER BAR */}
      <header
        className="flex items-center justify-between px-6 py-0 shrink-0 border-b-2 border-gray-300"
        style={{ background: "#0d1b3e", height: "56px" }}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 border-2 border-orange-400 flex items-center justify-center">
            <span style={{ color: "#f5a623", fontSize: "14px", fontWeight: 700 }}>S</span>
          </div>
          <span className="text-white tracking-wide" style={{ fontSize: "15px", fontWeight: 600, letterSpacing: "0.04em" }}>
            SCHOOL EQUIPMENT TRACKING SYSTEM
          </span>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-gray-300" style={{ fontSize: "13px" }}>
            Role: <span className="text-white" style={{ fontWeight: 600 }}>Property Custodian</span>
          </span>
          <div
            className="w-8 h-8 flex items-center justify-center border border-gray-500"
            style={{ background: "#1e2d5a", color: "#f5a623", fontSize: "13px", fontWeight: 700 }}
          >
            PC
          </div>
        </div>
      </header>

      {/* BODY */}
      <div className="flex flex-1 overflow-hidden">
        {/* LEFT SIDEBAR */}
        <aside
          className="flex flex-col shrink-0 border-r-2 border-gray-300"
          style={{ width: "200px", background: "#ffffff" }}
        >
          <div className="px-4 py-3 border-b border-gray-200" style={{ background: "#f9f9f9" }}>
            <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
              Navigation
            </span>
          </div>
          <nav className="flex flex-col mt-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => setActiveNav(link)}
                className="text-left px-4 py-3 border-b border-gray-100 transition-colors"
                style={{
                  fontSize: "14px",
                  color: activeNav === link ? "#f5a623" : "#1a1a2e",
                  background: activeNav === link ? "#fff8ee" : "transparent",
                  borderLeft: activeNav === link ? "3px solid #f5a623" : "3px solid transparent",
                  fontWeight: activeNav === link ? 600 : 400,
                  cursor: "pointer",
                }}
              >
                {link}
              </button>
            ))}
          </nav>

          {/* Sidebar placeholder block */}
          <div className="mt-auto mx-3 mb-4 border border-dashed border-gray-300 p-3" style={{ background: "#fafafa" }}>
            <p style={{ fontSize: "11px", color: "#aaa", textAlign: "center" }}>[ Sidebar Widget ]</p>
            <div className="mt-2 h-12 bg-gray-100 border border-gray-200" />
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex flex-1 overflow-hidden gap-0">
          {/* CENTER PANEL */}
          <section className="flex flex-col flex-1 overflow-hidden p-5">
            {/* Page Title + Breadcrumb */}
            <div className="mb-3">
              <div style={{ fontSize: "11px", color: "#999" }}>Dashboard &rsaquo; Asset Registry</div>
              <h1 className="mt-1" style={{ fontSize: "20px", color: "#0d1b3e", fontWeight: 700, letterSpacing: "0.01em" }}>
                Asset Registry
              </h1>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: "Total Assets", value: assets.length, color: "#0d1b3e" },
                { label: "Active", value: assets.filter((a) => a.status === "Active").length, color: "#2e7d32" },
                { label: "Under Repair / Inactive", value: assets.filter((a) => a.status !== "Active").length, color: "#b45309" },
              ].map((card) => (
                <div
                  key={card.label}
                  className="border border-gray-300 px-4 py-3"
                  style={{ background: "#fff" }}
                >
                  <div style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.07em" }}>{card.label}</div>
                  <div style={{ fontSize: "26px", fontWeight: 700, color: card.color, lineHeight: 1.3 }}>{card.value}</div>
                </div>
              ))}
            </div>

            {/* Table Controls */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Search assets..."
                  className="border border-gray-300 px-3 py-1.5 outline-none"
                  style={{ fontSize: "13px", width: "220px", background: "#fff" }}
                />
                <select
                  className="border border-gray-300 px-2 py-1.5 outline-none"
                  style={{ fontSize: "13px", background: "#fff", color: "#333" }}
                >
                  <option>All Status</option>
                  <option>Active</option>
                  <option>Under Repair</option>
                  <option>Inactive</option>
                </select>
              </div>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 text-white border-0 cursor-pointer"
                style={{ background: "#f5a623", fontSize: "13px", fontWeight: 600, letterSpacing: "0.02em" }}
              >
                + Add New Asset
              </button>
            </div>

            {/* DATA TABLE */}
            <div className="flex-1 overflow-auto border border-gray-300" style={{ background: "#fff" }}>
              <table className="w-full border-collapse" style={{ fontSize: "13px" }}>
                <thead>
                  <tr style={{ background: "#0d1b3e" }}>
                    {["Asset ID", "Name", "Room", "Status", "Action"].map((col) => (
                      <th
                        key={col}
                        className="text-left px-4 py-2.5 border-r border-blue-900"
                        style={{ color: "#fff", fontWeight: 600, fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.06em", whiteSpace: "nowrap" }}
                      >
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {assets.map((asset, i) => (
                    <tr
                      key={asset.id}
                      style={{ background: i % 2 === 0 ? "#ffffff" : "#f7f8fa" }}
                      className="border-b border-gray-200 hover:bg-blue-50 transition-colors"
                    >
                      <td className="px-4 py-2.5 border-r border-gray-200" style={{ color: "#0d1b3e", fontWeight: 600 }}>
                        {asset.id}
                      </td>
                      <td className="px-4 py-2.5 border-r border-gray-200" style={{ color: "#222" }}>
                        {asset.name}
                      </td>
                      <td className="px-4 py-2.5 border-r border-gray-200" style={{ color: "#555" }}>
                        {asset.room}
                      </td>
                      <td className="px-4 py-2.5 border-r border-gray-200">
                        <span
                          className={`px-2 py-0.5 border ${STATUS_COLORS[asset.status]}`}
                          style={{ fontSize: "11px", fontWeight: 600, letterSpacing: "0.04em" }}
                        >
                          {asset.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-2.5">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleQrPreview(asset)}
                            className="px-2 py-1 border border-gray-300 text-gray-600 cursor-pointer hover:bg-gray-50"
                            style={{ fontSize: "11px" }}
                          >
                            QR
                          </button>
                          <button
                            onClick={() => { setSelectedAsset(asset); }}
                            className="px-2 py-1 border cursor-pointer hover:opacity-80"
                            style={{ fontSize: "11px", background: "#0d1b3e", color: "#fff", borderColor: "#0d1b3e" }}
                          >
                            View
                          </button>
                          <button
                            onClick={() => handleDelete(asset.id)}
                            className="px-2 py-1 border cursor-pointer hover:opacity-80"
                            style={{ fontSize: "11px", background: "#fee2e2", color: "#991b1b", borderColor: "#fca5a5" }}
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {assets.length === 0 && (
                <div className="flex items-center justify-center h-32 text-gray-400" style={{ fontSize: "13px" }}>
                  No assets found.
                </div>
              )}
            </div>

            {/* Table Footer */}
            <div className="flex items-center justify-between pt-2" style={{ fontSize: "12px", color: "#888" }}>
              <span>Showing {assets.length} record(s)</span>
              <div className="flex gap-1">
                {["&laquo;", "1", "2", "3", "&raquo;"].map((p, i) => (
                  <button
                    key={i}
                    className="px-2 py-1 border border-gray-300"
                    style={{ background: i === 1 ? "#0d1b3e" : "#fff", color: i === 1 ? "#fff" : "#555", cursor: "pointer", fontSize: "12px" }}
                    dangerouslySetInnerHTML={{ __html: p }}
                  />
                ))}
              </div>
            </div>
          </section>

          {/* RIGHT PANEL */}
          <aside
            className="shrink-0 border-l-2 border-gray-300 flex flex-col"
            style={{ width: "220px", background: "#ffffff" }}
          >
            {/* QR Code Preview */}
            <div className="border-b border-gray-200 px-3 py-2" style={{ background: "#f9f9f9" }}>
              <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                QR Code Preview
              </span>
            </div>

            <div className="p-3 flex flex-col gap-3">
              {/* QR Placeholder Box */}
              <div
                className="border-2 border-dashed border-gray-400 flex flex-col items-center justify-center relative"
                style={{ width: "100%", height: "180px", background: "#e5e7eb" }}
              >
                {/* X mark */}
                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                  <line x1="8" y1="8" x2="40" y2="40" stroke="#9ca3af" strokeWidth="3" strokeLinecap="square" />
                  <line x1="40" y1="8" x2="8" y2="40" stroke="#9ca3af" strokeWidth="3" strokeLinecap="square" />
                </svg>
                <span style={{ fontSize: "11px", color: "#9ca3af", marginTop: "6px", textAlign: "center" }}>
                  QR Code Preview<br />Component
                </span>
              </div>

              {/* Asset info if QR selected */}
              {qrAsset ? (
                <div className="border border-gray-200 px-3 py-2" style={{ background: "#f9f9f9" }}>
                  <div style={{ fontSize: "11px", color: "#888", marginBottom: "4px" }}>SELECTED ASSET</div>
                  <div style={{ fontSize: "13px", color: "#0d1b3e", fontWeight: 700 }}>{qrAsset.id}</div>
                  <div style={{ fontSize: "12px", color: "#444" }}>{qrAsset.name}</div>
                  <div style={{ fontSize: "11px", color: "#888" }}>{qrAsset.room}</div>
                  <button
                    className="mt-2 w-full py-1.5 border-0 cursor-pointer"
                    style={{ background: "#f5a623", color: "#fff", fontSize: "12px", fontWeight: 600 }}
                  >
                    Generate QR
                  </button>
                </div>
              ) : (
                <p style={{ fontSize: "11px", color: "#aaa", textAlign: "center" }}>
                  Click "QR" on any asset row to preview
                </p>
              )}
            </div>

            {/* Asset Detail Preview */}
            <div className="border-t border-gray-200 px-3 py-2 mt-1" style={{ background: "#f9f9f9" }}>
              <span style={{ fontSize: "11px", color: "#888", textTransform: "uppercase", letterSpacing: "0.08em", fontWeight: 600 }}>
                Asset Detail
              </span>
            </div>
            <div className="p-3">
              {selectedAsset ? (
                <div className="flex flex-col gap-1.5">
                  {[
                    ["Asset ID", selectedAsset.id],
                    ["Name", selectedAsset.name],
                    ["Room", selectedAsset.room],
                    ["Status", selectedAsset.status],
                  ].map(([label, value]) => (
                    <div key={label} className="border-b border-gray-100 pb-1.5">
                      <div style={{ fontSize: "10px", color: "#999", textTransform: "uppercase" }}>{label}</div>
                      <div style={{ fontSize: "13px", color: "#222" }}>{value}</div>
                    </div>
                  ))}
                  <button
                    onClick={() => setSelectedAsset(null)}
                    className="mt-1 w-full py-1.5 border border-gray-300 cursor-pointer hover:bg-gray-50"
                    style={{ fontSize: "12px", color: "#555" }}
                  >
                    Clear
                  </button>
                </div>
              ) : (
                <div
                  className="border border-dashed border-gray-300 flex items-center justify-center"
                  style={{ height: "100px", background: "#f3f4f6" }}
                >
                  <span style={{ fontSize: "11px", color: "#bbb" }}>No asset selected</span>
                </div>
              )}
            </div>
          </aside>
        </main>
      </div>

      {/* ADD ASSET MODAL */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50" style={{ background: "rgba(0,0,0,0.4)" }}>
          <div className="border-2 border-gray-300 p-0" style={{ background: "#fff", width: "400px" }}>
            {/* Modal Header */}
            <div
              className="flex items-center justify-between px-4 py-3 border-b border-gray-200"
              style={{ background: "#0d1b3e" }}
            >
              <span style={{ color: "#fff", fontSize: "14px", fontWeight: 600 }}>Add New Asset</span>
              <button
                onClick={() => setShowModal(false)}
                style={{ color: "#ccc", background: "none", border: "none", fontSize: "18px", cursor: "pointer", lineHeight: 1 }}
              >
                ✕
              </button>
            </div>
            {/* Modal Body */}
            <div className="p-5 flex flex-col gap-3">
              {[
                { label: "Asset Name", key: "name", placeholder: "e.g. Dell Laptop" },
                { label: "Room / Location", key: "room", placeholder: "e.g. Room 101" },
              ].map(({ label, key, placeholder }) => (
                <div key={key} className="flex flex-col gap-1">
                  <label style={{ fontSize: "12px", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={newAsset[key as "name" | "room"]}
                    onChange={(e) => setNewAsset({ ...newAsset, [key]: e.target.value })}
                    className="border border-gray-300 px-3 py-2 outline-none"
                    style={{ fontSize: "13px", background: "#fafafa" }}
                  />
                </div>
              ))}
              <div className="flex flex-col gap-1">
                <label style={{ fontSize: "12px", color: "#555", textTransform: "uppercase", letterSpacing: "0.05em" }}>Status</label>
                <select
                  value={newAsset.status}
                  onChange={(e) => setNewAsset({ ...newAsset, status: e.target.value })}
                  className="border border-gray-300 px-3 py-2 outline-none"
                  style={{ fontSize: "13px", background: "#fafafa" }}
                >
                  <option>Active</option>
                  <option>Under Repair</option>
                  <option>Inactive</option>
                </select>
              </div>
            </div>
            {/* Modal Footer */}
            <div className="flex gap-2 px-5 pb-5">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 border border-gray-300 cursor-pointer hover:bg-gray-50"
                style={{ fontSize: "13px", color: "#555" }}
              >
                Cancel
              </button>
              <button
                onClick={handleAddAsset}
                className="flex-1 py-2 cursor-pointer border-0 hover:opacity-90"
                style={{ background: "#f5a623", color: "#fff", fontSize: "13px", fontWeight: 600 }}
              >
                Save Asset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
