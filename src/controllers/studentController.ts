import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createStudent,
  editStudent,
  studentAge,
  studentsByClass,
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
      const result = await studentAge(id);
      const response = { age: Math.floor(result.age) };
      res.status(200).send(response);
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  getStudentsByClass = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await studentsByClass(id);
      res.status(200).send({ students: result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
