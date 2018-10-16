import * as t from "io-ts";

// represents a Date from an ISO string
const dateFromString = new t.Type<Date, string>(
  "DateFromString",
  (m): m is Date => m instanceof Date,
  (m, c) =>
    t.string.validate(m, c).chain(s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d);
    }),
  a => a.toISOString()
);

const today = () => {
  const date = new Date();
  date.setHours(0, 0, 0, 0);
  return date;
};

const dateAfteToday = t.refinement(
  dateFromString,
  x => x.getTime() > today().getTime(),
  "dateAfteToday"
);

const nonEmptyString = t.refinement(
  t.string,
  x => x.trim().length > 0,
  "nonEmptyString"
);

export const FruitForm = t.type({
  name: nonEmptyString,
  start: dateAfteToday
});

export interface IFruitForm extends t.TypeOf<typeof FruitForm> {}
