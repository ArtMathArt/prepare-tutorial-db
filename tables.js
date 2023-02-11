import { DataTypes } from "sequelize";

export const PERSON = [
  "PERSON",
  {
    uuid: {
      type: DataTypes.UUID,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    phoneNumber: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
  },
];

export const STUDENT = (model) => [
  "STUDENT",
  {
    personId: {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model,
        key: "uuid",
      },
    },
    stipend: {
      type: DataTypes.REAL,
    },
  },
];

export const TEACHER = (model) => [
  "TEACHER",
  {
    personId: {
      type: DataTypes.UUID,
      unique: true,
      references: {
        model,
        key: "uuid",
      },
    },
    salary: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  },
];

export const COURSE = (model) => [
  "COURSE",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    credits: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    teacherId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model,
        key: "personId",
      },
    },
  },
];

export const STUDENT_TO_COURSE = (studentModel, courseModel) => [
  "STUDENT_TO_COURSE",
  {
    studentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: studentModel,
        key: "personId",
      },
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: courseModel,
        key: "id",
      },
    },
  },
];
