const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoutes = require("./routes/users");
const employeeRoutes = require ("./routes/employee")
const equipmentRoutes = require("./routes/equipment.js")
const authRoutes = require('./Functions/auth')
const app = express();
app.use(cors());
app.use(express.json());


app.use('/', userRoutes)
app.use('/', authRoutes)
app.use('/', employeeRoutes)
app.use('/', equipmentRoutes)


const PORT = 3001;
const uri =
  "mongodb+srv://dbUser:HuaweiGT3@cluster0.qi0blxm.mongodb.net/AllEmployers";
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

