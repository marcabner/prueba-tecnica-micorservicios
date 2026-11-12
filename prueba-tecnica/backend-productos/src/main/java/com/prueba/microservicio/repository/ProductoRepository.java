package com.prueba.microservicio.repository;

import com.prueba.microservicio.model.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ProductoRepository extends JpaRepository<Producto, Long> {
    // Ordenamiento fecha de creación
    List<Producto> findAllByOrderByFechaCreacionDesc();
}