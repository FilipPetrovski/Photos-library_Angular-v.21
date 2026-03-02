# 📸 PhotosLibrary - DevSkiller Task

This project is a modern, zoneless Angular v21 application built to fulfill the DevSkiller Photo Library challenge.

## 🚀 Task Overview

The goal was to create an infinite random photostream with a "Favorites" persistence layer, focusing on:

- **Zoneless Change Detection** for maximum performance.
- **Custom Infinite Scroll** (No external libraries).
- **Signal-based State Management** using Angular Signals.
- **API Emulation** with random network latency (200-300ms).

## 🛠 Tech Stack

- **Framework:** [Angular v21](https://angular.dev) (Zoneless mode)
- **Styling:** [SCSS](https://sass-lang.com) with a custom design system (`_colors.scss`, `_typography.scss`).
- **Components:** [Angular Material](https://material.angular.io) (M3 Theme).
- **Test Runner:** [Vitest](https://vitest.dev/).
- **Icons:** Material Symbols / Icons.

## 📂 Project Structure

- `src/app/core/`: Singleton services (`PhotoService`) and models.
- `src/app/shared/`: Reusable components (`PhotoCard`, `LoadingSpinner`) and the custom `InfiniteScroll` directive.
- `src/app/features/`: Feature modules for `PhotosLibrary`, `Favorites`, and `PhotoDetail`.
- `src/styles/`: Global Design Tokens and Material 3 overrides.

## 📋 Features Implemented

- [x] **Header:** Centered navigation with active route highlighting and a live favorite count badge.
- [x] **Photos Screen (`/`):**
  - Infinite scroll using a custom `IntersectionObserver` directive.
  - API emulation with a 200-300ms random delay.
  - Loading spinner overlay during data fetching.
- [x] **Favorites Screen (`/favorites`):**
  - Filtered list of saved photos.
  - Persistence across page refreshes (LocalStorage).
- [x] **Single Photo Page (`/photos/:id`):**
  - Full-screen view of a specific photo.
  - "Remove from favorites" functionality.

## 🧪 Testing

To execute unit tests using the modern Vitest runner:

```bash
ng test
```
