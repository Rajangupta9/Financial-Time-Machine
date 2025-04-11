"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/server.ts
const express = require("express");
const app = express();
const PORT = 3000;
console.log(PORT);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
