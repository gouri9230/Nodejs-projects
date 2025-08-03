# Wallets Notes API
This project is a RESTful API built with **Node.js**, **Express.js**, and **MongoDB** that allows users to store, retrieve, and manage **notes linked to wallet addresses**. 

---
## Features

- Add a note to a specific wallet address.
- Retrieve all notes for a given wallet address.
- Get a wallet and its notes by document ID.
- Get all the notes linked to specific wallet address.
- List all wallet entries with their associated notes.
- Delete a wallet and its notes by ID.

---

## Tech Stack

| Layer       | Technology           |
|-------------|----------------------|
| Language    | JavaScript (ES6+)    |
| Runtime     | Node.js              |
| Framework   | Express.js           |
| Database    | MongoDB + Mongoose   |
| API Testing | Postman              |

---

## Steps to Run
1. **Clone the repo:**
- git clone https://github.com/yourusername/wallets-api.git
- cd wallets-api
2. **Install dependencies:**
- npm install
3. **Create a .env file:** define
- PORT
- CONNECTION_DB
4. **Run the server:**
- npm start
