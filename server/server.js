require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const connectDB = require("./config/db");
const blogRoutes = require("./routes/blogs");
const adminRoutes = require("./routes/admin");
const { errorHandler } = require("./middleware/errorHandler");

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(morgan("dev"));
app.use(cors());
app.use(express.json({ limit: "10mb" })); // allow large post content
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("MERN Blog API"));

app.use("/api/blogs", blogRoutes);
app.use("/api/admin", adminRoutes);

// error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
