const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
//Initializing variables
const app = express();
const authMiddleware = require("./middleware/auth-middleware");
const PORT = process.env.PORT || 5000;

//Connecting to DB
mongoose.connect(
  "mongodb+srv://Hamzah:Haz1996@cluster0-20vtk.mongodb.net/mern_simple_jwt?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to DB")
);
//Using CORS middleware
app.use(cors());
//Using express JSON parse middleware
app.use(express.json());

//Importing route files
const authRoutes = require("./routes/authRoutes");

//Routes middleware
app.use("/auth", authRoutes);

//Protected routes
app.get("/protected", authMiddleware, (req, res) => {
  res.status(200).json({ msg: "Reached protected route" });
});

app.use((error, req, res, next) => {
  // console.log(error);
  res.status(400);
  res
    .status(error.code || 500)
    .json({ msg: error.message || "An error has occured" });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
