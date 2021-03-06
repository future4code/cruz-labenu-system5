import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import {
  createHobby,
  createStudent,
  deleteClass,
  deleteStudent,
  editStudent,
  studentAge,
  studentsByClass,
  studentsByHobby,
  updateStudentHobbies,
} from "../data/studentQueries";
import { labenuStudent, hobby } from "../types/student";

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

      if (!name || !birthDate || !email)
        throw new Error("Something is missing: id, name, email or birthDate.");

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

      if (!classId) throw new Error("Please, inform the classId.");

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

  removeClass = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      await deleteClass(id);

      res.send({ message: "Class has been removed" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  removeStudent = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;

      await deleteStudent(id);
      res.send({ message: "Deleted student" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  postHobby = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;
      if (!name) throw new Error("The name field is missing");
      const data: hobby = {
        id: uuidv4(),
        name,
      };
      await createHobby(data);
      res.send({ message: "Hobby created!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  addHobby = async (req: Request, res: Response) => {
    try {
      const { hobbyId, studentId } = req.body;

      if (!hobbyId || !studentId)
        throw new Error("Please, inform both hobbyId and studentId.");

      await updateStudentHobbies(hobbyId, studentId);

      res.send({ message: "Hobby assigned to a student!" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getStudentsByHobby = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await studentsByHobby(id);
      res.status(200).send({ students: result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
