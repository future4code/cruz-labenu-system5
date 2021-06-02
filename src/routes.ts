import express, { Router } from "express";
import ClassController from "./controllers/classController";
import TeacherController from "./controllers/teacherController";
import StudentController from "./controllers/studentController";

const routes: Router = express.Router();
const classController = new ClassController();
const teacherController = new TeacherController();
const studentController = new StudentController();

routes.get("/ping", (_, res) => {
  res.send({ message: "pong" });
});

routes.post("/class", classController.postClass);
routes.post("/teacher", teacherController.postTeacher);
routes.post("/teacher/specialty", teacherController.postSpecialty);
routes.get("/teacher/specialty", teacherController.getAllSpecialties);
routes.post("/student", studentController.postStudent);

export default routes;
