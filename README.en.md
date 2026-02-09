[🇪🇸 Español](README.md)

# 🧙‍♂️ Magical Encyclopedia — Harry Potter API

Web application built with **React + Vite** that allows users to explore characters and spells from the Harry Potter universe using the **HP API**, featuring advanced search, filters, persistent favorites, testing, and AA-level accessibility.

---

## 🚀 Demo

- GitHub: https://github.com/David-Navarro-Oliver/apiHarryPotterReact  
- Vercel: pending deployment

---

## 🖼️ Preview

Hero screenshot: pending.

---

## ✨ Features

The application provides a smooth and usability-focused experience for exploring Harry Potter characters and spells.

The **Characters** section displays a responsive grid with name-based search and a system of combinable filters that allow users to refine results by house, role, life status, gender, species, and favorites, without reloading data from the API. Filters are applied cumulatively, enabling precise searches even with large datasets.

The **Load more** system handles pagination locally, progressively increasing the number of visible items without additional network requests, improving performance and user experience.

Each character includes an accessible **detail view** through dynamic routes, showing extended information about the selected character.

The **Spells** section presents a simple searchable list, prioritizing clarity and fast access to information.

The **favorites** system allows users to mark and unmark characters, storing the selection in `localStorage` so it persists across sessions and can be used as an additional filtering criterion.

The application covers all relevant **UI states**, including data loading, network errors, and empty results, always providing clear feedback to the user.

---

## 🔌 API & Data

**HP API:** https://hp-api.onrender.com/

**Endpoints used:**
- `/api/characters`
- `/api/character/:id`
- `/api/characters/students`
- `/api/characters/staff`
- `/api/characters/house/:house`
- `/api/spells`

**Data handling:**
- Centralized Axios instance
- Data normalization
- Custom character model
- Image fallback handling
- Consistent boolean values

---

## 🧱 Tech Stack

- React + Vite
- React Router
- Axios
- Lightweight CSS
- ESLint + Prettier
- Vitest + Testing Library

---

## ♿ Accessibility (AA)

The application has been developed following real accessibility criteria aligned with **WCAG AA** level.

All character images, even when sourced from an external API, include dynamic `alt` attributes based on the character’s name, ensuring proper interpretation by screen readers. When images are missing or broken, a fallback system is applied to preserve accessibility and avoid empty visual content.

Forms and filtering controls use **accessible labels**, enabling clear navigation with both mouse and keyboard. Focus is always visible, and the tab order remains logical across all views.

Application states (*loading*, *error*, and *empty*) do not rely solely on color to convey information and always include clear textual messages, improving usability for users with visual or cognitive impairments.

The overall interface structure prioritizes sufficient contrast, clear visual hierarchy, and consistent interactive components.

---

## 🧪 Testing

The project includes a testing base focused on validating **business logic**, not only visual rendering.

Unit tests have been implemented for the `useCharacters` hook, covering real application behavior such as data loading, filter application, pagination via **Load more**, favorites management, `localStorage` persistence, and error handling when the API fails.

These tests run in isolation, without depending on page DOM structure, providing robust and maintainable validation of internal logic.

Additionally, basic integration tests verify the routing system, ensuring that main views render correctly based on user navigation.

This combination of tests provides a solid foundation to prevent regressions and demonstrates a quality-oriented frontend approach.

---

## 🗂️ Folder Structure

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

## ⚙️ Installation

```bash
npm install
npm run dev
```

Other commands:

```bash
npm run lint
npm run format
npm run test
```

---

## 🧑‍💻 Author

David Navarro

---

## 📄 License

MIT
