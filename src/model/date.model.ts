const numberOfDate = Array.from({ length: 31 }, (_, i) => ++i);

const months = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'Mei',
  'Jun',
  'Jul',
  'Agt',
  'Sep',
  'Okt',
  'Nov',
  'Des',
];

const currentYear = new Date().getFullYear();
const HUNRED_YEAR = 100;
const numberOfYear = Array.from(
  { length: HUNRED_YEAR },
  (_, i) => currentYear - i
);

export { numberOfDate, months, numberOfYear };
