import connection from "../data/connection";
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
