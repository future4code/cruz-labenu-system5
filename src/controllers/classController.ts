import { Response, Request } from "express";
import { labenuClass } from "../types/class";
import { v4 as uuidv4 } from "uuid";
import { createClass } from "../data/classQueries";

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
}
