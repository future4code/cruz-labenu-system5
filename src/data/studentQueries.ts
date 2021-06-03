import connection from "../data/connection";
import { hobby, labenuStudent } from "../types/student";

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

export const studentAge = async (id: string): Promise<any> => {
  const [result] = await connection.raw(`
    SELECT DATEDIFF(CURDATE(), birth_date) / 365
    AS "age"
    FROM student
    WHERE id = "${id}"
  `);

  return result[0];
};

export const studentsByClass = async (id: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT
      student.name
    FROM class
    JOIN student
    ON class.id = student.class_id
    WHERE class.id = "${id}"
  `);
  return result[0];
};

export const deleteClass = async (id: string): Promise<any> => {
  await connection("student")
    .update({
      class_id: null,
    })
    .where("id", id);
};

export const deleteStudent = async (id: string): Promise<any> => {
  await connection("student_hobbies").delete().where("student_id", id);

  await connection("student").delete().where("id", id);
};

export const createHobby = async (data: hobby): Promise<any> => {
  await connection("hobbies").insert(data);
};

export const updateStudentHobbies = async (
  hobbyId: string,
  studentId: string
): Promise<any> => {
  await connection("student_hobbies").insert({
    hobby_id: hobbyId,
    student_id: studentId,
  });
};

export const studentsByHobby = async (id: string): Promise<any> => {
  const result = await connection.raw(`
    SELECT
      student.name
    FROM student_hobbies AS hobbies
    JOIN student
    ON hobbies.student_id = student.id
    WHERE hobbies.hobby_id = "${id}"
  `);
  return result[0];
};
