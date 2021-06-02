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
routes.patch("/class/:id", classController.changeModule);
routes.post("/teacher", teacherController.postTeacher);
routes.post("/teacher/specialty", teacherController.postSpecialty);
routes.get("/teacher/specialty", teacherController.getAllSpecialties);
routes.patch("/teacher/:id", teacherController.addClass);
routes.post("/student", studentController.postStudent);
routes.post("/student/update-class/:id", studentController.updateStudent);

export default routes;
