require("express-async-errors");
const router = require("./routes")
const express = require("express");
const AppError = require("./utils/AppError");
const migrationsRun = require("./database/sqlite/migrations")

const uploadsConfig = require("./configs/uploads");

const app = express();


app.use(express.json());
app.use(router);

app.use("/files", express.static(uploadsConfig.UPLOADS_FOLDER));

migrationsRun()

app.use((err, req, res, next) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({
            status: "error",
            message: err.message
        });
    }

    console.error(err);

    return res.status(500).json({
        status: "error",
        message: "Internal server error"
    });
});


const PORT = 3333;
app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));