const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

const authRoutes = require("./routes/authRoutes");
const leadRoutes = require("./routes/leadRoutes");
const proposalRoutes = require("./routes/proposalRoutes");

app.use("/api/auth", authRoutes);
app.use("/api/leads", leadRoutes);
app.use("/api/proposals", proposalRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(()=>console.log("MongoDB Connected"))
  .catch(err=>console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>console.log(`Server running on ${PORT}`));
