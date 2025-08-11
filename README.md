# Fullstack Test Task

## About the Project

This is a fullstack application developed as part of a technical assignment.

It consists of:

- **Frontend**: React (created using Create React App), JavaScript
- **Backend**: Node.js, Express.js

**Code Quality Tools**:

- ESLint
- Prettier

---

## API Endpoints

### Sessoin routes

- GET /session/
  Starts a new session or retrieves an existing one.
  Requires authentication via token (authMiddleware).
  Response: Current session data including credits and balance.

- POST /session/topUpCredits
  Adds credits to the user’s session.
  Requires authentication.
  Request body: { creditsAmount: number }
  Response: Updated session with new credits and balance.

- GET /session/cashOut
  Cashes out current credits to balance, resetting credits to zero.
  Requires authentication.
  Response: Updated session data.

### Game routes

- POST /game/spin
  Performs a slot spin action.
  Requires authentication.
  Response: Spin result with slot symbols and updated credits/balance.

### Authentication Routes

- POST /auth/register
  Registers a new user.
  Request body: user credentials (e.g. username, password)
  Response: Registration confirmation or error.

- POST /auth/login
  Logs in an existing user.
  Request body: user credentials
  Response: Authentication token (JWT) for subsequent requests.

---

## Project Setup

### Backend Setup (Node.js + Express)

The backend is built using pure Node.js and the Express.js framework.

**Why this stack:**

- Node.js is lightweight and well-suited for handling asynchronous operations, which is perfect for handling HTTP requests.
- Express.js offers a simple and minimalistic API for routing and middleware management without unnecessary overhead.

**To run the backend:**

cd server
npm install
npm start

### Frontend Setup (React + JavaScript)

The frontend is developed using **React** with **JavaScript**, initialized via **Create React App (CRA)**.

**Why this stack:**

- React provides a component-based architecture and fast UI rendering.

- CRA offers a quick setup with built-in tooling, making it ideal for fast prototyping without manual configuration.

To run the frontend:

cd client
npm install
npm start

### Development Notes

- The project structure was intentionally kept simple to focus on core logic rather than complex architecture.

- No state management library (e.g., Redux) was used to keep the setup minimal.

---

## Code Style: ESLint + Prettier Setup

To maintain a consistent code style and catch common errors during development, **ESLint** and **Prettier** were integrated into both the frontend and backend parts of the project.

### Setup Process

1. Installed the required dependencies:

npm install --save-dev eslint prettier eslint-config-prettier eslint-plugin-prettier

2. Configured Prettier in .prettierrc and added .prettierignore.

3. For ESLint, I intended to use the traditional JSON config file:
   .eslintrc.json

However, **a blocker appeared**:

- By default, the latest versions of ESLint (v9+) use the new "flat config" system - requiring eslint.config.js, .mjs, or .cjs.
- This meant that .eslintrc.json was being ignored, and the linter wasn't picking up my rules.

### Challenge Faced

- I initially tried to configure ESLint using .eslintrc.json, but ESLint was not recognizing it due to the new flat config requirement.

- This created some confusion, and the linter wasn’t applying rules as expected.

### Solution Implemented

I downgraded ESLint to the latest version that still supports .eslintrc.json format (v8.x).

---

## Session Management (Initial Implementation)

Upon entering the site, a simple session mechanism was implemented as follows:

- When a user visits the site, a **session token** is generated using Node.js's built-in `crypto` module.
- This generated token is stored in a server-side `Map()` object, where it is associated with user data such as `credits` (user balance).
- On each relevant request, the server verifies the token by checking it against the stored tokens in the `Map()`.
- If the token is valid and present in the `Map()`, the server proceeds with the requested operation.

This approach allowed for basic session handling and user state tracking without complex authentication.

### Note

Storing session data in a server-side Map() is better than using localStorage because it keeps sensitive information secure and prevents tampering by the client. Unlike localStorage, which is accessible and modifiable by the user’s browser, server-side storage ensures data integrity and centralized control over user sessions.

### Note

After initial implementation, Ostap recommended switching to a more secure and standard authentication method using **JWT (JSON Web Tokens)**.

The JWT-based authentication will be implemented in a later stage of the project.

---

## Slot Machine Spin Logic

The slot machine spin is implemented with the following logic:

- There are 4 possible symbols: Cherry (C), Lemon (L), Orange (O), and Watermelon (W).
- Each spin randomly selects three symbols independently.
- A win occurs only if all three symbols in the result match.
- Each symbol has a predefined reward value (e.g., Cherry = 10 credits, Lemon = 20, etc.).
- To add challenge, a "cheat" mechanism slightly reduces the chance of winning when the player’s credits are above certain thresholds:
  - If credits are between 40 and 60, there is a 30% chance to re-roll and avoid a win.
  - If credits are above 60, the chance increases to 60%.
- The function returns the spin result, whether it was a win, and the reward earned.

---

## Account Top-Up Logic

The account top-up feature allows users to add credits to their account balance:

- The client sends a request with the `topUpAmount` and the current `sessionId` stored in cookies.
- The server retrieves the session associated with the `sessionId` from the session storage.
- If the session exists, the user's credits are incremented by the specified `topUpAmount`.
- The updated credits are saved back to the session store.
- The new credit balance is returned in the response.

---

## User Authentication with JWT

User authentication was implemented using JSON Web Tokens (JWT) and bcrypt:

- **Registration**:  
  Users can register with a `username` and `password`. Passwords are securely hashed using `bcrypt` before being stored in memory.

- **Login**:  
  On login, the provided credentials are validated. If valid, a JWT is generated containing the username and returned to the client.

- **Protected Routes**:  
  An `authMiddleware` checks for the presence of a valid token in the `Authorization` header of incoming requests.  
  If the token is valid, the user payload is attached to the request and access is granted.

---

## Client routes

- **/** — The main page displaying the slot machine game (SpinSlotPage).

- **/registration** — User registration page where new users can create an account.

- **/login** — User login page (LoginPage) for existing users to sign in.

- **/unauthorized** — A page shown when a user tries to access a protected resource without proper authorization (UnauthorizedPage).

--

## Context Usage

The app uses **React Context** (AppContext) to manage and share global state across components without prop drilling.

The AppProvider component wraps the entire app and provides key state values and functions such as:

- **credits** and **balance** — user’s current game credits and balance.

- **slots** and **isSpinning** — state of slot machine symbols and their spinning animation.

- Functions to fetch data, handle spins, update credits, user registration, login, and more.

This centralized state management via context allows components at any level to access and update shared data easily and consistently.
