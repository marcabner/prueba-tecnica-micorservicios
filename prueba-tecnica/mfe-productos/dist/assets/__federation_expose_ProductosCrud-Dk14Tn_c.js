import { importShared } from './__federation_fn_import-gVVR6EuA.js';
import { r as reactExports } from './index-Dm_EQZZA.js';

var jsxRuntime = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:true,ref:true,__self:true,__source:true};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a) void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}reactJsxRuntime_production_min.Fragment=l;reactJsxRuntime_production_min.jsx=q;reactJsxRuntime_production_min.jsxs=q;

{
  jsxRuntime.exports = reactJsxRuntime_production_min;
}

var jsxRuntimeExports = jsxRuntime.exports;

const {useState,useEffect} = await importShared('react');

const API_URL = "http://localhost:8080/api/v1/productos";
function App() {
  const [productos, setProductos] = useState([]);
  const [form, setForm] = useState({ id: null, nombre: "", descripcion: "", precio: "", activo: 1 });
  const [editando, setEditando] = useState(false);
  const cargarProductos = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProductos(data);
    } catch (err) {
      console.error("Error al consultar API:", err);
    }
  };
  useEffect(() => {
    cargarProductos();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const metodo = editando ? "PUT" : "POST";
    const url = editando ? `${API_URL}/${form.id}` : API_URL;
    await fetch(url, {
      method: metodo,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        nombre: form.nombre,
        descripcion: form.descripcion,
        precio: parseFloat(form.precio),
        activo: Number(form.activo)
      })
    });
    resetForm();
    cargarProductos();
  };
  const handleEditar = (prod) => {
    setForm(prod);
    setEditando(true);
  };
  const handleEliminar = async (id) => {
    if (!confirm("¿Eliminar este registro?")) return;
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    cargarProductos();
  };
  const resetForm = () => {
    setForm({ id: null, nombre: "", descripcion: "", precio: "", activo: 1 });
    setEditando(false);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { fontFamily: "system-ui, sans-serif", maxWidth: "900px", margin: "2rem auto", padding: "0 1rem" }, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { children: "Gestión de Productos (Microfrontend)" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, style: { display: "grid", gap: "0.75rem", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", marginBottom: "2rem", padding: "1rem", border: "1px solid #ddd", borderRadius: "8px" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Nombre",
          value: form.nombre,
          onChange: (e) => setForm({ ...form, nombre: e.target.value }),
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "text",
          placeholder: "Descripción",
          value: form.descripcion || "",
          onChange: (e) => setForm({ ...form, descripcion: e.target.value })
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "input",
        {
          type: "number",
          step: "0.01",
          placeholder: "Precio",
          value: form.precio,
          onChange: (e) => setForm({ ...form, precio: e.target.value }),
          required: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { value: form.activo, onChange: (e) => setForm({ ...form, activo: e.target.value }), children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 1, children: "Activo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: 0, children: "Inactivo" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { display: "flex", gap: "0.5rem" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", style: { flex: 1, cursor: "pointer" }, children: editando ? "Actualizar" : "Crear" }),
        editando && /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "button", onClick: resetForm, children: "Cancelar" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("table", { border: "1", cellPadding: "10", style: { width: "100%", borderCollapse: "collapse", textAlign: "left" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("thead", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { style: { backgroundColor: "#f4f4f4" }, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "ID" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Nombre" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Descripción" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Precio" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Estado" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Fecha Creación" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("th", { children: "Acciones" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("tbody", { children: productos.map((p) => /* @__PURE__ */ jsxRuntimeExports.jsxs("tr", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: p.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: p.nombre }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: p.descripcion }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          "$",
          Number(p.precio).toFixed(2)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: p.activo === 1 ? "Activo" : "Inactivo" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("td", { children: new Date(p.fechaCreacion).toLocaleString() }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("td", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEditar(p), style: { marginRight: "0.5rem" }, children: "Editar" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => handleEliminar(p.id), children: "Eliminar" })
        ] })
      ] }, p.id)) })
    ] })
  ] });
}

export { App as default, jsxRuntimeExports as j };
