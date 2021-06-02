import express, { Router } from "express";
import ClassController from "./controllers/classController";
import TeacherController from "./controllers/teacherController";

const routes: Router = express.Router();
const classController = new ClassController();
const teacherController = new TeacherController();

routes.get("/ping", (_, res) => {
  res.send({ message: "pong" });
});

routes.post("/class", classController.postClass);
routes.post("/teacher", teacherController.postTeacher);
routes.post("/teacher/specialty", teacherController.postSpecialty);
routes.get("/teacher/specialty", teacherController.getAllSpecialties);
routes.patch("/teacher/:id", teacherController.addClass);

export default routes;
