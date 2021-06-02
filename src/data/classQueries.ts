import connection from "./connection";
import { labenuClass } from "../types/class";

export const createClass = async ({
  id,
  name,
  startDate: start_date,
  endDate: end_date,
  shift,
  module,
}: labenuClass): Promise<any> => {
  await connection("class").insert({
    id,
    name,
    start_date,
    end_date,
    shift,
    module,
  });
};

export const updateModule = async (
  classId: string,
  module: number
): Promise<any> => {
  await connection("class").update({ module }).where("id", classId);
};
