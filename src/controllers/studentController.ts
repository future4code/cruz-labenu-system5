import { Response, Request } from "express";
import { v4 as uuidv4 } from "uuid";
import { createStudent } from "../data/studentQueries";
import { labenuStudent } from "../types/student";

export default class StudentController {
  postStudent = async (req: Request, res: Response) => {
    const { name, birthDate, email } = req.body;

    const data: labenuStudent = {
      name,
      birthDate,
      email,
      id: uuidv4(),
    };

    await createStudent(data);
    res.send({ message: "Student created!" });
    try {
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
