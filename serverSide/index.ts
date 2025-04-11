// src/server.ts
import  express = require('express');

const  app = express();
const PORT =  3000;
console.log(PORT);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});