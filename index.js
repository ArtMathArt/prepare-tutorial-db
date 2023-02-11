import { Sequelize } from "sequelize";
import { generateStudentData, generateTeachersData } from "./data.js";
import {
  createStudents,
  createTeachersCourses,
  assignStudentsToCourses,
  defineTables
} from "./db-actions.js";

async function addStudents({ Person, Student }) {
  const students = generateStudentData();

  await createStudents({ Person, Student, students });

  return students;
}

async function addTeachersCourses({ Teacher, Course, Person }) {
  const teachers = generateTeachersData();

  await createTeachersCourses({ Teacher, Course, Person, teachers });

  return teachers;
}

(async () => {
  console.log("Start...");
  const sequalize = new Sequelize({
    dialect: "sqlite",
    storage: "tutorial.db",
    define: {
      freezeTableName: true,
      createdAt: false,
      updatedAt: false,
    },
  });

  const { Person, Student, Teacher, Course, StudentToCourse } =
    await defineTables(sequalize);

  const students = await addStudents({ Person, Student });

  const teachers = await addTeachersCourses({ Teacher, Course, Person });

  await assignStudentsToCourses({ teachers, students, StudentToCourse });

  await sequalize.sync();
  console.log("Done...");
})().catch((err) => {
  console.error(err);
});
