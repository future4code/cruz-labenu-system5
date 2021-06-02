import { specialty, teacher } from "../types/teacher";
import connection from "./connection";

export const createTeacher = async (
  { id, name, email, birthDate: birth_date }: teacher,
  specialties: string[]
): Promise<any> => {
  await connection("teacher").insert({ id, name, email, birth_date });

  await Promise.all(
    specialties.map(async (specialty) => {
      return await connection("teacher_specialty").insert({
        teacher_id: id,
        specialty_id: specialty,
      });
    })
  );
};

export const createSpecialty = async (data: specialty): Promise<any> => {
  await connection("specialty").insert(data);
};

export const selectAllSpecialties = async (): Promise<any> => {
  const result = await connection("specialty");

  return result;
};
