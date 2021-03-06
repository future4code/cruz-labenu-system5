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
routes.delete("/teacher/:id", teacherController.removeClass);
routes.post("/student", studentController.postStudent);
routes.post("/student/hobby", studentController.postHobby);
routes.patch("/student/add/hobby", studentController.addHobby);
routes.post("/student/update-class/:id", studentController.updateStudent);
routes.delete("/student/update-class/:id", studentController.removeClass);
routes.get("/student-age/:id", studentController.getStudentAge);
routes.get("/class/:id/students", studentController.getStudentsByClass);
routes.get("/class/:id/teachers", classController.getTeachersByClass);
routes.delete("/student/:id", studentController.removeStudent);
routes.get("/hobby/:id/students", studentController.getStudentsByHobby);

export default routes;
