import { Response, Request } from "express";
import { labenuClass } from "../types/class";
import { v4 as uuidv4 } from "uuid";
import {
  createClass,
  updateModule,
  teachersByClass,
} from "../data/classQueries";

export default class ClassController {
  postClass = async (req: Request, res: Response) => {
    const { name, startDate, endDate, shift, module } = req.body;

    const data: labenuClass = {
      name,
      startDate,
      endDate,
      id: uuidv4(),
      shift,
      module,
    };

    await createClass(data);
    res.send({ message: "Created class" });
    try {
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  changeModule = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const { module } = req.body;

      if (!module) throw new Error("The module field is missing");

      await updateModule(id, module);

      res.send({ message: "Updated module" });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };

  getTeachersByClass = async (req: Request, res: Response) => {
    try {
      const id = req.params.id as string;
      const result = await teachersByClass(id);
      res.status(200).send({ teachers: result });
    } catch (error) {
      res.status(400).send(error.message);
    }
  };
}
