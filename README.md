# rEFui TodoMVC

A TodoMVC application built using the [rEFui](https://github.com/SudoMaker/refui), demonstrating its core concepts and reactivity model.

## Features

- Add new todo items
- Mark todo items as complete
- Edit existing todo items
- Delete individual todo items
- Filter todos by "All", "Active", and "Completed"
- Clear all completed todo items

## Technologies Used

- [rEFui](https://github.com/SudoMaker/refui): A retained-mode UI framework.
- [Vite](https://vitejs.dev/): A fast build tool for modern web projects.
- [pnpm](https://pnpm.io/): A fast, disk space efficient package manager.

## Setup and Installation

To get this project up and running on your local machine, follow these steps:

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd refui-todomvc
    ```

2.  **Install dependencies:**

    This project uses `pnpm`. If you don't have pnpm installed, you can install it via npm:

    ```bash
    npm install -g pnpm
    ```

    Then, install the project dependencies:

    ```bash
    pnpm install
    ```

## Running the Application

To start the development server with Hot Module Replacement (HMR):

```bash
pnpm dev
```

This will typically start the application at `http://localhost:5173` (or another available port).

## Building for Production

To build the application for production, which will generate optimized static assets in the `dist` directory:

```bash
pnpm build
```

## Project Structure

-   `index.html`: The main HTML entry point.
-   `src/main.jsx`: The application's entry point, where the rEFui renderer is initialized.
-   `src/App.jsx`: The main application component containing the TodoMVC logic and UI.
-   `src/index.css`: (Currently empty) The stylesheet for the application. **You will need to add the TodoMVC CSS content here for proper styling.**
-   `vite.config.js`: Vite configuration for rEFui and HMR.
-   `package.json`: Project metadata and scripts.

## Styling Note

This project uses the standard TodoMVC CSS for styling. The `src/index.css` file is currently empty. For the application to display correctly, please copy the content of the [TodoMVC App CSS `index.css` file](https://raw.githubusercontent.com/tastejs/todomvc-app-css/master/index.css) into `src/index.css`.

## License

This project is licensed under the MIT License - see the LICENSE file for details. (Note: A `LICENSE` file is not included in this response, but it's good practice to add one.)
