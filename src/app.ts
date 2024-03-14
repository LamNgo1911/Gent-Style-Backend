import express from "express";
import dotenv from "dotenv";
import productsRouter from "./routers/productsRouter";
import usersRouter from "./routers/usersRouter";
import cartRouter from "./routers/cartRouter";
import categoryRouter from "./routers/categoryRouter";

dotenv.config()


const app = express();

app.use(express.json());
app.use("/api/v1/products", productsRouter);
app.use("/api/v1/users", usersRouter);
app.use("/api/v1/cart", cartRouter)
app.use("/api/v1/categoriy", categoryRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`);
});
