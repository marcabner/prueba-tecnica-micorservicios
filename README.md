# prueba-tecnica-micorservicios
Microfrontend y backend con contenedores, Springboot, React Vite, Oracle DB, Docker
# Sistema de Gestión de Productos — Arquitectura de Microservicios y Microfrontends

Solución full-stack contenerizada para realizar operaciones de consulta ordenada, alta, actualización y eliminación (CRUD) de registros, implementando una arquitectura desacoplada basada en **Oracle Database 21c**, **Java 21 (Spring Boot 3)** y **Microfrontends con Module Federation (React + Vite)**.

---

## 1. Resumen Técnico y Stack Tecnológico

a) **Base de Datos (Oracle Database 21c XE):** Contenedor `gvenzl/oracle-xe:21-slim` sobre PDB `XEPDB1`. Esquema inicializado automáticamente mediante `init.sql` con columnas `IDENTITY` y auditoría temporal `TIMESTAMP`.
b) **Backend / Microservicio (Java 21 + Spring Boot 3.3):** Arquitectura en capas (`Controller`, `Repository`, `Entity`), Spring Data JPA/Hibernate para el mapeo objeto-relacional, Jakarta Bean Validation, Lombok y driver oficial `ojdbc11`.
c) **Microfrontend Remoto (React 18 + Vite 5):** Empaquetado como módulo federado mediante `@originjs/vite-plugin-federation`, exponiendo `./ProductosCrud` en `remoteEntry.js` sobre Nginx con soporte CORS.
d) **Host Shell / Contenedor (React 18 + Vite 5):** Aplicación portal principal que consume dinámicamente el microfrontend remoto mediante `React.lazy`, `Suspense` y manejo de fallos con `ErrorBoundary`.
e) **Orquestación (Docker & Docker Compose):** Despliegue unificado con compilaciones *multi-stage* y `healthcheck` de base de datos para garantizar el arranque ordenado de los servicios.

---

## 2. Arquitectura del Sistema

```text
+-------------------------------------------------------------------+
|                        Navegador del Usuario                      |
|                                                                   |
|     Host Shell (Puerto 5000 - Nginx)                              |
|        MFE Productos (Puerto 5001 - remoteEntry.js)               |
|        - Tabla ordenada descendentemente por fecha_creacion       |
|        - Formulario reactivo de Alta y Edición                    |
+-------------------------------  |---------------------------------+
                                  | HTTP / REST (JSON)
                                  v
+-------------------------------------------------------------------+
|  Microservicio Java 21 / Spring Boot (Puerto 8080)                |
|  - Validación de entrada (@Valid) y control de CORS               |
|  - Consultas derivadas JPA (OrderByFechaCreacionDesc)             |
+-------------------------------+---------------------------------+

                                  | JDBC Thin (ojdbc11)
                                  v
+---------------------------------------------------------------+
|  Oracle Database 21c XE (Puerto 1521 - PDB: XEPDB1)             |
|  - Tabla: APP_USER.PRODUCTOS                                      |
+-------------------------------------------------------------------+
