import express, { Router } from "express";
import ClassController from "./controllers/classController";

const routes: Router = express.Router();
const classController = new ClassController();

routes.get("/ping", (_, res) => {
  res.send({ message: "pong" });
});

routes.post("/class", classController.postClass);

export default routes;
