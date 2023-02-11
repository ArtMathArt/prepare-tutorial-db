import { COURSE, PERSON, STUDENT, STUDENT_TO_COURSE, TEACHER } from "./tables.js";
import {randomCourses} from './data.js';

export async function defineTables(sequalize) {
  const Person = sequalize.define(...PERSON);
  const Student = sequalize.define(...STUDENT(Person));
  const Teacher = sequalize.define(...TEACHER(Person));
  const Course = sequalize.define(...COURSE(Teacher));
  const StudentToCourse = sequalize.define(
    ...STUDENT_TO_COURSE(Student, Course)
  );
  await sequalize.sync();
  return { Person, Student, Teacher, Course, StudentToCourse };
}

export async function createStudents({ students, Person, Student }) {
  for (let student of students) {
    let { stipend, ...studentPerson } = student;
    await Person.create(studentPerson);
    await Student.create({ stipend, personId: studentPerson.uuid });
  }
}

export async function createTeachersCourses({
  teachers,
  Person,
  Teacher,
  Course,
}) {
  for (let teacher of teachers) {
    let { salary, course, ...teacherPerson } = teacher;
    await Person.create(teacherPerson);
    await Teacher.create({ salary, personId: teacherPerson.uuid });
    let courseDB = await Course.create({
      ...course,
      teacherId: teacherPerson.uuid,
    });
    course.id = courseDB.id;
  }
}

export async function assignStudentsToCourses({
  students,
  teachers,
  StudentToCourse,
}) {
  for (let student of students) {
    let courses = randomCourses(teachers);
    for (let course of courses) {
      await StudentToCourse.create({
        studentId: student.uuid,
        courseId: course.id,
      });
    }
  }
}
