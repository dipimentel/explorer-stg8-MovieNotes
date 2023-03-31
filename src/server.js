const express = require("express");
const app = express();

app.get("/", (req, res) => {
    const { id } = req.query;
    res.send(`Estou funcionando! Meu ID é o ${id}`);
});

const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
