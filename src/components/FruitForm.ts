import * as t from "io-ts";

// represents a Date from an ISO string
const DateFromString = new t.Type<Date, string>(
  "DateFromString",
  (m): m is Date => m instanceof Date,
  (m, c) =>
    t.string.validate(m, c).chain(s => {
      const d = new Date(s);
      return isNaN(d.getTime()) ? t.failure(s, c) : t.success(d);
    }),
  a => a.toISOString()
);

export const FruitForm = t.type({
  name: t.string,
  start: DateFromString
});

export interface IFruitForm extends t.TypeOf<typeof FruitForm> {}
