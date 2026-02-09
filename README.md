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

La aplicación permite explorar personajes y hechizos del universo Harry Potter mediante una experiencia fluida y enfocada en la usabilidad.

La sección de **Personajes** ofrece un grid responsive con búsqueda por nombre y un sistema de filtros combinables que permite refinar los resultados por casa, rol, estado vital, género, especie y favoritos, sin necesidad de recargar datos desde la API. Los filtros se aplican de forma acumulativa, permitiendo búsquedas precisas incluso con grandes volúmenes de información.

El sistema de **Load more** gestiona la paginación de forma local, incrementando progresivamente el número de elementos visibles sin realizar nuevas peticiones de red, mejorando el rendimiento y la experiencia de usuario.

Cada personaje cuenta con una **vista de detalle** accesible mediante rutas dinámicas, donde se muestra información ampliada del personaje seleccionado.

La sección de **Hechizos** presenta un listado simple con búsqueda, priorizando claridad y rapidez de acceso a la información.

El sistema de **favoritos** permite marcar y desmarcar personajes, almacenando la selección en `localStorage` para que persista entre sesiones y pueda utilizarse como criterio de filtrado adicional.

La aplicación contempla todos los **estados relevantes de la UI**, incluyendo carga de datos, errores de red y situaciones sin resultados, mostrando siempre feedback claro al usuario.

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

La aplicación ha sido desarrollada teniendo en cuenta criterios reales de accesibilidad, alineados con el nivel **AA**.

Todas las imágenes de personajes, aunque proceden de una API externa, incluyen atributos `alt` dinámicos basados en el nombre del personaje, garantizando una correcta interpretación por lectores de pantalla. En caso de imágenes inexistentes o rotas, se aplica un sistema de *fallback* que mantiene la accesibilidad y evita contenido visual vacío.

Los formularios y controles de filtrado utilizan **labels accesibles**, permitiendo una navegación clara tanto con ratón como exclusivamente con teclado. El foco es siempre visible y el flujo de tabulación resulta coherente en todas las vistas.

Los estados de la aplicación (*loading*, *error* y *empty*) no dependen únicamente del color para transmitir información, sino que presentan mensajes textuales claros, mejorando la comprensión para usuarios con diversidad visual o cognitiva.

La estructura general de la interfaz prioriza contraste suficiente, jerarquía visual clara y consistencia en los componentes interactivos.

---

## 🧪 Testing


El proyecto incluye una base de tests orientada a validar la **lógica de negocio**, no únicamente la representación visual.

Se han implementado tests unitarios del hook `useCharacters`, cubriendo los casos más relevantes del comportamiento real de la aplicación: carga correcta de datos, aplicación de filtros, paginación mediante **Load more**, gestión de favoritos, persistencia en `localStorage` y manejo de errores cuando la API falla.

Estos tests se ejecutan de forma aislada, sin depender de la estructura del DOM de las páginas, lo que permite validar la lógica interna de manera robusta y mantenible.

Adicionalmente, se han incorporado tests de integración básicos sobre el sistema de rutas, verificando que las vistas principales se renderizan correctamente en función de la navegación del usuario.

La combinación de estos tests proporciona una base sólida para detectar regresiones y demuestra un enfoque consciente hacia la calidad y fiabilidad del frontend.

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

