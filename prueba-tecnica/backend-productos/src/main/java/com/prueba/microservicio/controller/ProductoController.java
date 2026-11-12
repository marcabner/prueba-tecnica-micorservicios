package com.prueba.microservicio.controller;

import com.prueba.microservicio.model.Producto;
import com.prueba.microservicio.repository.ProductoRepository;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/productos")
@CrossOrigin(origins = "*") // Permite la conexión desde MicroFrontend
@RequiredArgsConstructor
public class ProductoController {

    private final ProductoRepository repository;

    @GetMapping
    public List<Producto> listarOrdenados() {
        return repository.findAllByOrderByFechaCreacionDesc();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return repository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<Producto> crear(@Valid @RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(repository.save(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> actualizar(@PathVariable Long id, @Valid @RequestBody Producto detalles) {
        return repository.findById(id).map(existente -> {
            existente.setNombre(detalles.getNombre());
            existente.setDescripcion(detalles.getDescripcion());
            existente.setPrecio(detalles.getPrecio());
            existente.setActivo(detalles.getActivo() != null ? detalles.getActivo() : existente.getActivo());
            return ResponseEntity.ok(repository.save(existente));
        }).orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!repository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        repository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}