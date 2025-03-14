const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const { rootRouter } = require("./routes/index");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use("/api", rootRouter);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("MongoDB connected"))
    .catch((err) => console.log(err));

// Example route
app.get("/", (req, res) => {
    res.send("Hello from the backend!");
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
