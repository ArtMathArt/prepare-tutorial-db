import {
  randNumber,
  randFirstName,
  randLastName,
  randPhoneNumber,
  randPastDate,
  randJobArea,
} from "@ngneat/falso";
import { v4 as uuid4 } from "uuid";

export function generateStudentData() {
  return new Array(70).fill({}).map((student) => {
    return {
      uuid: uuid4(),
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNumber: randPhoneNumber({ countryCode: "UA" }),
      birthDate: randPastDate({ years: 25 }).toISOString().split("T")[0],
      stipend: randNumber({ min: 500, max: 1000, precision: 100 }),
    };
  });
}

export function generateTeachersData() {
  return new Array(30).fill({}).map((teacher) => {
    return {
      uuid: uuid4(),
      firstName: randFirstName(),
      lastName: randLastName(),
      phoneNumber: randPhoneNumber({ countryCode: "UA" }),
      birthDate: randPastDate({ years: 95 }).toISOString().split("T")[0],
      salary: randNumber({ min: 50000, max: 100000, precision: 100 }),
      course: {
        name: randJobArea(),
        credits: randNumber({ min: 5, max: 15, precision: 5 }),
      },
    };
  });
}

export function randomCourses(teachers) {
  return teachers
    .map((teacher) => teacher.course)
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
}
