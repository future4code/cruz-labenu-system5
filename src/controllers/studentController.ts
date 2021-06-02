import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createStudent,
  deleteClass,
  editStudent,
  getStudentAge,
} from "../data/studentQueries";
import { labenuStudent } from "../types/student";

export default class StudentController {
  postStudent = async (req: Request, res: Response) => {
    try {
      const { name, birthDate, email } = req.body;
      const data: labenuStudent = {
        name,
        birthDate,
        email,
        id: uuidv4(),
      };

      await createStudent(data);
      res.status(200).send({ message: "Student created!" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  updateStudent = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { classId } = req.body;
      await editStudent(classId, id);
      res.status(200).send({ message: "Student added in a class!" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  getStudentAge = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await getStudentAge(id);
      const response = { age: Math.floor(result.age) };
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  removeClass = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      await deleteClass(id);

      res.send({ message: "Class has been removed" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
