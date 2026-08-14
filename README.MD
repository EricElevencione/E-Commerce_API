# E-Commerce API & Admin Dashboard

Welcome to the project! Below is the documentation of the current tech stack, UI layout/libraries, and imported fonts used in this repository.

## 💻 Tech Stack

This project is organized as a monorepo consisting of a frontend administration dashboard and a backend API configuration.

### Frontend (`e-commerce-api`)
*   **Framework**: [React 19](https://react.dev) (v19.2.8) - defined in [package.json](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-api/package.json)
*   **Development Tooling / Bundler**: [Vite](https://vite.dev) (v8.2.0)
*   **Language**: [TypeScript](https://www.typescriptlang.org) (~6.0.2)
*   **Routing**: [React Router DOM](https://reactrouter.com) (v7.18.2) for client-side routing
*   **Optimization Compiler**: React Compiler (`babel-plugin-react-compiler`)

### Backend (`e-commerce-back-end`)
*   **Database ORM**: [Prisma ORM](https://www.prisma.io) (v6.4.1) - defined in [package.json](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-back-end/package.json)
*   **Language**: [TypeScript](https://www.typescriptlang.org) (v5.8.2)
*   **Configuration Management**: [dotenv](https://github.com/motdotla/dotenv) (v16.4.7)

---

## 🎨 UI & Styling

*   **Styling Framework**: [TailwindCSS v4](https://tailwindcss.com) (using `@tailwindcss/vite` integration) for utility-class-based design.
*   **UI Components**: [shadcn/ui v4](https://ui.shadcn.com) initialized using `@base-ui/react` and Tailwind CSS v4 variables.
    *   *Default components added: [button.tsx](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-api/src/components/ui/button.tsx), with utilities configured at [utils.ts](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-api/src/lib/utils.ts).*
*   **Icons**: [FontAwesome Icons](https://fontawesome.com) (`@fortawesome/react-fontawesome` v3.5.0, `@fortawesome/free-solid-svg-icons` v7.3.1)
*   **Styling Architecture**: Tailwind utility classes (e.g. in [Dashboard.tsx](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-api/src/components/pages/Dashboard.tsx)) paired with custom CSS files (e.g. [index.css](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-api/src/index.css), `App.css`, `Sidebar.css`).

---

## 🔤 Fonts

The application currently relies on the user's operating system **default font stack** defined in [index.css](file:///c:/Users/dblaz/OneDrive/Desktop/Personal%20Projects/E-Commerce%20API/e-commerce-api/src/index.css#L14-L16). No external web fonts (like Google Fonts) are imported yet.

*   **Sans-Serif / Headings**: `system-ui, 'Segoe UI', Roboto, sans-serif`
*   **Monospace**: `ui-monospace, Consolas, monospace`
