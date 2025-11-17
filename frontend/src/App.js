import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_URL = "http://127.0.0.1:8000/api/productos/";

function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({
    id: null,
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Cargar lista (READ)
  const cargarProductos = async () => {
    try {
      setLoading(true);
      const res = await axios.get(API_URL);
      setProductos(res.data);
      setError("");
    } catch (err) {
      console.error(err);
      setError("Error al cargar productos");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  // Manejo de cambios del form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Crear / Editar
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.nombre || !form.precio) {
      alert("Nombre y precio son obligatorios");
      return;
    }

    const data = {
      nombre: form.nombre,
      descripcion: form.descripcion,
      precio: form.precio,
      stock: form.stock || 0,
    };

    try {
      setLoading(true);
      if (form.id) {
        // UPDATE
        await axios.put(`${API_URL}${form.id}/`, data);
      } else {
        // CREATE
        await axios.post(API_URL, data);
      }

      await cargarProductos();
      limpiarFormulario();
    } catch (err) {
      console.error(err);
      setError("Error al guardar el producto");
    } finally {
      setLoading(false);
    }
  };

  const handleEditar = (producto) => {
    setForm({
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion || "",
      precio: producto.precio,
      stock: producto.stock,
    });
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que querés eliminar este producto?")) return;

    try {
      setLoading(true);
      await axios.delete(`${API_URL}${id}/`);
      await cargarProductos();
    } catch (err) {
      console.error(err);
      setError("Error al eliminar el producto");
    } finally {
      setLoading(false);
    }
  };

  const limpiarFormulario = () => {
    setForm({
      id: null,
      nombre: "",
      descripcion: "",
      precio: "",
      stock: "",
    });
  };

  return (
    <div className="container mt-4">
      <h1 className="text-center mb-4">CRUD de Productos</h1>

      {/* FORMULARIO */}
      <div className="card mb-4">
        <div className="card-header">
          {form.id ? "Editar producto" : "Nuevo producto"}
        </div>
        <div className="card-body">
          {error && <div className="alert alert-danger">{error}</div>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nombre</label>
              <input
                type="text"
                name="nombre"
                className="form-control"
                value={form.nombre}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Descripción</label>
              <textarea
                name="descripcion"
                className="form-control"
                value={form.descripcion}
                onChange={handleChange}
              ></textarea>
            </div>

            <div className="mb-3">
              <label className="form-label">Precio</label>
              <input
                type="number"
                step="0.01"
                name="precio"
                className="form-control"
                value={form.precio}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Stock</label>
              <input
                type="number"
                name="stock"
                className="form-control"
                value={form.stock}
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {form.id ? "Guardar cambios" : "Crear producto"}
            </button>
            {form.id && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={limpiarFormulario}
              >
                Cancelar edición
              </button>
            )}
          </form>
        </div>
      </div>

      {/* TABLA */}
      <h2 className="mb-3">Listado de productos</h2>

      {loading && <p>Cargando...</p>}

      <table className="table table-striped table-bordered table-hover">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Stock</th>
            <th style={{ width: "160px" }}>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.nombre}</td>
              <td>{p.descripcion}</td>
              <td>${p.precio}</td>
              <td>{p.stock}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEditar(p)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleEliminar(p.id)}
                >
                  Borrar
                </button>
              </td>
            </tr>
          ))}

          {productos.length === 0 && !loading && (
            <tr>
              <td colSpan="6" className="text-center">
                No hay productos cargados.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default App;
