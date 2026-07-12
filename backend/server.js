require("dotenv").config();

console.log("SERVIDOR NUEVO - 12:00");

const express = require("express");
const session = require("express-session");
const path = require("path");

const app = express();
console.log("Cargando rutas...");

const authRoutes = require("./routes/auth");
const miembrosRoutes = require("./routes/miembros");
console.log("MIEMBROS ROUTE:", miembrosRoutes);

console.log(authRoutes);
console.log("Rutas cargadas.");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api", authRoutes);
app.use("/api/miembros", miembrosRoutes);

app.use(
    session({
        secret: "ETR_2026_SECRET",
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 8 // 8 horas
        }
    })
);

// Archivos públicos
app.use(express.static(path.join(__dirname, "../")));

// Ruta principal
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚒 Sistema ETR ejecutándose en http://localhost:${PORT}`);
});