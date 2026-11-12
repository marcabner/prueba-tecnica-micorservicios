import React, { Suspense } from 'react';

const ProductosCrudRemoto = React.lazy(() => import('mfe_productos/ProductosCrud'));

class MfeErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '1rem', background: '#f8d7da', color: '#842029', borderRadius: '6px' }}>
          No se pudo cargar el microfrontend <strong>mfe_productos</strong> (puerto 5001).
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <div style={{ fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ background: '#1e293b', color: '#fff', padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '1.25rem' }}>Portal Corporativo (Host Shell)</h1>
        <span style={{ fontSize: '0.85rem', opacity: 0.8 }}>Puerto 5000 → MFE Puerto 5001</span>
      </header>
      <main style={{ padding: '1rem' }}>
        <MfeErrorBoundary>
          <Suspense fallback={<p style={{ textAlign: 'center', marginTop: '2rem' }}>Cargando módulo remoto...</p>}>
            <ProductosCrudRemoto />
          </Suspense>
        </MfeErrorBoundary>
      </main>
    </div>
  );
}