[🇬🇧 English](README.en.md)

# 🧙‍♂️ Enciclopedia Mágica — Harry Potter API

Aplicación web desarrollada con **React + Vite** que permite explorar personajes y hechizos del universo Harry Potter mediante la **HP API**, con búsqueda avanzada, filtros, favoritos persistentes, tests y accesibilidad AA.

---

## 🚀 Demo

- GitHub: https://github.com/David-Navarro-Oliver/apiHarryPotterReact  
- Vercel: pendiente de publicar

---

## 🖼️ Vista previa

Captura hero: pendiente.

---

## ✨ Funcionalidades

### 🏠 Home (`/`)
- Presentación de la aplicación
- CTA a **Personajes** y **Hechizos**

### 🧑‍🎓 Personajes (`/characters`)
- Grid de cards **responsive**
- Búsqueda por nombre
- Filtros:
  - Casa
  - Rol (student / staff)
  - Vivo / muerto
  - Género
  - Especie
  - Favoritos
- Botón **Load more**
- Favoritos persistentes

### 🧾 Detalle de personaje (`/characters/:id`)
- Vista detallada del personaje seleccionado

### ✨ Hechizos (`/spells`)
- Búsqueda
- Listado simple

### ⭐ Favoritos
- Guardados en `localStorage`
- Persisten al recargar la aplicación

### 📡 Estados de la aplicación
- Loading
- Error
- Empty (sin resultados)

---

## 🔌 API y datos

**HP API:** https://hp-api.onrender.com/

**Endpoints usados:**
- `/api/characters`
- `/api/character/:id`
- `/api/characters/students`
- `/api/characters/staff`
- `/api/characters/house/:house`
- `/api/spells`

**Gestión de datos:**
- Axios centralizado
- Normalización de datos
- Modelo propio de personaje
- Fallback de imagen
- Manejo de valores inconsistentes

---

## 🧱 Stack técnico

- React + Vite
- React Router
- Axios
- CSS ligero
- ESLint + Prettier
- Vitest + Testing Library

---

## ♿ Accesibilidad (AA)

- Contraste AA
- Navegación por teclado
- Focus visible
- `alt` en imágenes
- Labels accesibles
- Estados loading / error / empty accesibles

---

## 🧪 Testing

Tests implementados con:
- Vitest
- Testing Library
- jest-dom

Cobertura actual:
- Hook `useCharacters`
  - Carga de datos
  - Filtros
  - Paginación
  - Favoritos
  - Manejo de errores
- Rutas principales mediante `AppRouter`

---

## 🗂️ Estructura de carpetas

```txt
src/
├─ assets/
├─ components/
├─ features/
│  ├─ characters/
│  └─ spells/
├─ layouts/
├─ pages/
├─ routes/
├─ services/
├─ styles/
├─ test/
└─ utils/
```

---

## ⚙️ Instalación

```bash
npm install
npm run dev
```

Otros comandos:

```bash
npm run lint
npm run format
npm run test
```

---

## 🧑‍💻 Autor

David Navarro

---

## 📄 Licencia

MIT

