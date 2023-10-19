const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy; 
const session = require("express-session");
const authMiddleware = require("./Functions/authMiddle")

require("dotenv").config();
const app = express();

const userRoutes = require("./routes/users");
const employeeRoutes = require("./routes/employee");
const equipmentRoutes = require("./routes/equipment");
const authRoutes = require("./Functions/auth");
const telegaRoutes = require("./routes/Telega");
const applicationRoutes = require("./routes/application")


const User = require("./Models/User");

app.use(cors());
app.use(express.json());

app.use(
  session({
    secret: process.env.SECRET_KEY, // Замените на свой секретный ключ
    resave: false,
    saveUninitialized: false,
  })
);

// Инициализируйте Passport
app.use(passport.initialize());
app.use(passport.session());

// Настройка локальной стратегии Passport
passport.use(
  new LocalStrategy(
    {
      usernameField: "email", 
      passwordField: "password",
    },
    (email, password, done) => {
      console.log(User)
      User.findOne({ email: email }, (err, user) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: "Неверная электронная почта" });
        }
        if (!user.validatePassword(password)) {
          return done(null, false, { message: "Неверный пароль" });
        }
        return done(null, user);
      });
    }
  )
);

// Настройка сериализации и десериализации пользователя
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", employeeRoutes);
app.use("/", equipmentRoutes);
app.use("/", telegaRoutes);
app.use("/", applicationRoutes);

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
