import { useState, useEffect } from 'react';

const API_URL = 'http://127.0.0.1:8080/api/v1/productos';

export default function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: '', descripcion: '', precio: '', activo: 1 });
  const [editando, setEditando] = useState(false);

  const cargarProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error('Error al consultar API:', err);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = editando ? 'PUT' : 'POST';
    const url = editando ? `${API_URL}/${form.id}` : API_URL;

    await fetch(url, {
      method: metodo,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        activo: Number(form.activo),
      }),
    });

    resetForm();
    cargarProductos();
  };

  const handleEditar = (prod) => {
    setForm(prod);
    setEditando(true);
  };

  const handleEliminar = async (id) => {
    if (!confirm('¿Eliminar este registro?')) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarProductos();
  };

  const resetForm = () => {
    setForm({ id: null, nombre: '', descripcion: '', precio: '', activo: 1 });
    setEditando(false);
  };

  return (
    <div style={{ fontFamily: 'system-ui, sans-serif', maxWidth: '900px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Gestión de Productos (Microfrontend)</h2>

      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '0.75rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', marginBottom: '2rem', padding: '1rem', border: '1px solid #ddd', borderRadius: '8px' }}>
        <input
          type="text"
          placeholder="Nombre"
          value={form.nombre}
          onChange={(e) => setForm({ ...form, nombre: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Descripción"
          value={form.descripcion || ''}
          onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
        />
        <input
          type="number"
          step="0.01"
          placeholder="Precio"
          value={form.precio}
          onChange={(e) => setForm({ ...form, precio: e.target.value })}
          required
        />
        <select value={form.activo} onChange={(e) => setForm({ ...form, activo: e.target.value })}>
          <option value={1}>Activo</option>
          <option value={0}>Inactivo</option>
        </select>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" style={{ flex: 1, cursor: 'pointer' }}>
            {editando ? 'Actualizar' : 'Crear'}
          </button>
          {editando && (
            <button type="button" onClick={resetForm}>Cancelar</button>
          )}
        </div>
      </form>

      <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Estado</th>
            <th>Fecha Creación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${Number(p.precio).toFixed(2)}</td>
              <td>{p.activo === 1 ? 'Activo' : 'Inactivo'}</td>
              <td>{new Date(p.fechaCreacion).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEditar(p)} style={{ marginRight: '0.5rem' }}>Editar</button>
                <button onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}