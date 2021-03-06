import {UserNoteCourseAttributes} from "../models/UserNote";

const courses: {[name: string]: UserNoteCourseAttributes} = {
  CPSC110: {
    name: 'CPSC 110',
    className: 'CPSC110',
    label: 'CPSC 110',
    _id: 6,
  },
  CPSC210: {
    name: 'CPSC 210',
    className: 'CPSC210',
    label: 'CPSC 210',
    _id: 5,
  },
  CPSC310: {
    name: 'CPSC 310',
    className: 'CPSC310',
    label: 'CPSC 310',
    _id: 1,
  },
  ECON101: {
    name: 'ECON 101',
    className: 'ECON101',
    label: 'ECON 101',
    _id: 2,
  },
  ECON102: {
    name: 'ECON 102',
    className: 'ECON102',
    label: 'ECON 102',
    _id: 3,
  },
  ECON355: {
    name: 'ECON 355',
    className: 'ECON355',
    label: 'ECON 355',
    _id: 4,
  },
};

export { courses };

export const defaultOptions: UserNoteCourseAttributes[] = [
  {
    name: 'CPSC 110',
    className: 'CPSC110',
    label: 'CPSC 110',
    _id: 6,
  },
  {
    name: 'CPSC 210',
    className: 'CPSC210',
    label: 'CPSC 210',
    _id: 5,
  },
  {
    name: 'CPSC 310',
    className: 'CPSC310',
    label: 'CPSC 310',
    _id: 1,
  },
  {
    name: 'ECON 101',
    className: 'ECON101',
    label: 'ECON 101',
    _id: 2,
  },
  {
    name: 'ECON 102',
    className: 'ECON102',
    label: 'ECON 102',
    _id: 3,
  },
  {
    name: 'ECON 355',
    className: 'ECON355',
    label: 'ECON 355',
    _id: 4,
  },
];
