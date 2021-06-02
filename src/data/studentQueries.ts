import connection from "../data/connection";
import { labenuStudent } from "../types/student";

export const createStudent = async ({
  id,
  name,
  email,
  birthDate: birth_date,
}: labenuStudent): Promise<any> => {
  await connection("student").insert({
    id,
    name,
    email,
    birth_date,
  });
};
