const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasks");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/tasks", tasksRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});
