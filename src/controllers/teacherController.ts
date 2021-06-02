import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { specialty, teacher } from "../types/teacher";
import {
  createSpecialty,
  createTeacher,
  selectAllSpecialties,
} from "../data/teacherQueries";

export default class TeacherController {
  postTeacher = async (req: Request, res: Response) => {
    try {
      const { name, email, birthDate, specialties } = req.body;

      if (!name || !email || !birthDate || !specialties.length) {
        throw new Error(
          "Some field is missing: name, email, birthDate, classId and specialties are required"
        );
      }

      const teacherData: teacher = {
        id: uuidv4(),
        name,
        email,
        birthDate,
      };

      await createTeacher(teacherData, specialties);

      res.send({ message: "Created teacher" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  postSpecialty = async (req: Request, res: Response) => {
    try {
      const { name } = req.body;

      if (!name) throw new Error("The name field is missing");

      const data: specialty = {
        id: uuidv4(),
        name,
      };

      await createSpecialty(data);

      res.send({ message: "Created specialty" });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };

  getAllSpecialties = async (req: Request, res: Response) => {
    try {
      const result = await selectAllSpecialties();

      res.send({ specialties: result });
    } catch (error) {
      res.status(400).send({ message: error.message });
    }
  };
}
