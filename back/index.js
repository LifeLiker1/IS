const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employee");
const equipmentRoutes = require("./routes/equipment");
const authRoutes = require("./Functions/auth");
const telegaRoutes = require("./routes/Telega");
const applicationRoutes = require("./routes/application")

app.use(cors());
app.use(express.json());

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", employeeRoutes);
app.use("/", equipmentRoutes);
app.use("/", telegaRoutes);
app.use("/", applicationRoutes)

const PORT = process.env.PORT;
const uri = process.env.uri;

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB Atlas");
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
