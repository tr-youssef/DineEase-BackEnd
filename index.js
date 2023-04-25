import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import usersRouter from "./routes/users.js";
import categoriesRoutes from "./routes/categories.js";
import tableRoutes from "./routes/table.js";
import itemsRoutes from "./routes/items.js";
import uploadRoutes from "./routes/upload.js";
import ordersRoutes from "./routes/orders.js";
import bookedRoutes from "./routes/booked.js";
import restaurantsRoutes from "./routes/restaurants.js";

const app = express();
dotenv.config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(express.static("public"));
app.use(cors());

app.get("/", (req, res) => {
  res.send({ message: "Hello World!" });
});
app.use("/users", usersRouter);
app.use("/categories", categoriesRoutes);
app.use("/items", itemsRoutes);
app.use("/upload", uploadRoutes);
app.use("/orders", ordersRoutes);
app.use("/tables", tableRoutes);
app.use("/booked", bookedRoutes);
app.use("/restaurant", restaurantsRoutes);

const PORT = process.env.PORT || 5001;

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server running on port : ${PORT}`)))
  .catch((error) => console.log(error));
