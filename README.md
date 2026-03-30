# 🍎 Apple Shine - E-commerce Simulation

Este proyecto es una plataforma web integral diseñada para simular un entorno real de comercio electrónico especializado en servicios de pulido profesional de manzanas. Desarrollado como proyecto final para el curso de Desarrollo Web, destaca por su arquitectura multi-página, una gestión eficiente de estilos escalables y una experiencia de usuario fluida.

## 🚀 Funcionalidades Principales

* **Catálogo de Productos y Servicios:** Organización clara de ofertas profesionales con integración directa al flujo de compra.
* **Carrito de Compras Dinámico:**
    * Agregar productos desde distintas secciones del sitio.
    * Control de cantidades con actualización automática de subtotales, impuestos y totales en tiempo real.
    * Eliminación individual de ítems.
* **Sistema de Reseñas Interactivo:** Los usuarios pueden compartir su experiencia y calificar el servicio mediante un selector de estrellas funcional.
* **Persistencia de Datos:** Implementación de `LocalStorage` para que el usuario conserve su selección de productos al navegar por el sitio o recargar la página.
* **Interfaz Responsiva:** Diseño adaptado para dispositivos móviles, tablets y escritorio utilizando una arquitectura basada en Mixins de SASS.
* **Arquitectura de Estilos Modular:** Uso avanzado de preprocesadores para un código de estilos limpio, organizado y fácil de mantener.

## 🛠️ Tecnologías Utilizadas

* **HTML5** (Estructura semántica optimizada para accesibilidad).
* **CSS3** & **SASS/SCSS** (Uso de variables, mixins, nesting y arquitectura modular).
* **JavaScript Vanilla** (Manipulación del DOM, eventos y manejo de almacenamiento local).
* **Bootstrap 5** (Framework para grillas responsivas y componentes estructurales en páginas clave).
* **Google Fonts** (Tipografías Montserrat y Open Sans).

## 📂 Estructura del Proyecto

* `/index.html`: Página de aterrizaje principal con presentación institucional.
* `/pages/`: Directorio que contiene la arquitectura multi-página del sitio:
    * `carrito_compras.html`: Interfaz dinámica del carrito y resumen de compra.
    * `clientes_opiniones.html`: Sección interactiva para feedback y calificación de usuarios.
    * `servicios.html` & `productos.html`: Catálogos detallados de la oferta comercial.
    * `quienes_somos.html` & `contacto.html`: Secciones informativas y de comunicación.
* `/js/main.js`: Lógica integral del carrito, sistema de calificación y gestión de opiniones.
* `/styles/scss/`: Archivos fuente de SASS (variables, mixins y estructura modular).
* `/styles/style.css`: Estilos finales compilados utilizados por el navegador.
* `/assets/images/`: Directorio de recursos visuales e iconografía.

## 👤 Autor

* **Nicolás Costa** - *Estudiante de Ingeniería en Informática*

---
*Este proyecto fue realizado con fines educativos para la entrega final de la cursada de Desarrollo Web de CoderHouse.*