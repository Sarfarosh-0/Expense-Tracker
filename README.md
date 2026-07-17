# 💸 Modular Expense Tracker

A production-grade, state-driven financial ledger built purely with **vanilla HTML5**, **CSS3**, and modular **ES6+ JavaScript**. This application implements a completely decoupled design architecture, separating database state management, ledger calculations, and visual DOM templating into dedicated Javascript modules.

### 🔗 Live Production Demo
🚀 **[Launch Live Application](https://stellar-basbousa-142e5f.netlify.app)**

---

## 🏗️ Architectural Blueprint

The application is structured following modern software engineering principles, avoiding the monolithic files common in beginner vanilla projects:

```
EXPENSE-TRACKER/
├── index.html          # Semantic layout with dashboard metrics and transaction lists
├── style.css           # Highly responsive CSS layouts (Grid, Flex, transition indicators)
└── js/
    ├── app-ui.js       # UI Engine (DOM manipulation, event delegation, and form rendering)
    ├── calculation.js  # Ledger Calculations (computes balance, totals, and mapped summaries)
    └── storage.js      # DB Pipeline (handles structured serialization and localStorage syncing)
```

### ⚙️ Decoupled Module Design

1.  **`storage.js` (The DB Tier)**: 
    *   Exposes clean abstractions to read and write transactions.
    *   Enforces data normalization before writing to browser state via the `localStorage` API.
2.  **`calculation.js` (The Logic Tier)**:
    *   Pure mathematical functions that accept transaction arrays.
    *   Reduces raw transaction lists down to specific balances, aggregate income, and aggregate expenses without directly touching the DOM.
3.  **`app-ui.js` (The Presentation Tier)**:
    *   Captures user actions (form submissions, item deletions).
    *   Coordinates with `storage.js` to commit changes and pulls data from `calculation.js` to render performant, dynamic template changes.

---

## ⚡ Core JavaScript Engineering Concepts Applied

*   **ES6 Modules (`import` / `export`)**: Maintains clean scopes, prevents global namespace pollution, and makes testing individual subsystems straightforward.
*   **Persistent Storage Pipeline**: Uses stringified JSON serialization synced directly to the client's local memory, allowing transactions to survive page reloads.
*   **Robust Dynamic Form Handling**: Handles interactive transaction additions (preventing default submit behaviors, parsing precise positive/negative floats, and applying conditional state indicators).
*   **Array Functional Programming**: Leverages functional patterns (`map`, `filter`, `reduce`) inside calculations to compute ledger balances reliably.

---

## 🛠️ Local Installation & Development

To run or study this application locally on your machine:

1.  Clone the repository and navigate into the project directory:
    ```bash
    git clone https://github.com/Sarfarosh-0/JavaScript-Vanilla-Projects.git
    cd JavaScript-Vanilla-Projects/EXPENSE-TRACKER
    ```

2.  **Important**: Because the application uses native **ES6 Modules**, modern browsers restrict loading modules from local files (`file://`) due to CORS security policies. You **must** run it via a local web server.

    *   **Option A (VS Code)**: Install the **Live Server** extension and click **Go Live**.
    *   **Option B (Python)**: Run a quick server from your terminal:
        ```bash
        # Python 3
        python -m http.server 8000
        ```
        Then, open your browser and navigate to `http://localhost:8000`.

---

## 📝 License

Distributed under the MIT License. See [LICENSE](../../LICENSE) for more information.

Copyright (c) 2026 **Sarfarosh-0**.
