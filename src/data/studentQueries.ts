import connection from "../data/connection";
import { labenuStudent } from "../types/student";
import dayjs from "dayjs";

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

export const editStudent = async (
  classId: string,
  id: string
): Promise<any> => {
  await connection("student")
    .update({
      class_id: classId,
    })
    .where("id", id);
};

export const getStudentAge = async (id: string): Promise<any> => {
  const [result] = await connection.raw(`
    SELECT DATEDIFF(CURDATE(), birth_date) / 365
    AS "age"
    FROM student
    WHERE id = "${id}"
  `);

  return result[0];
};
