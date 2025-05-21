const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const cors = require("cors");

const todoRoutes = require("./routes/todoRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/todos", todoRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
