import React from "react";
import * as flags from "country-flag-icons/string/3x2";
import { Phonenumber } from "../utils/types";

export default function Flag({ phoneNumbers, number }: Props) {
  const country = number
    ? phoneNumbers
        .filter((phoneNumber) => {
          return phoneNumber.number === number;
        })?.[0]
        ?.country.toUpperCase()
    : phoneNumbers[0].country;
  // @ts-ignore
  const FlagSVG = flags[country];
  return (
    <div
      style={{ height: 28, width: 28, paddingTop: 7 }}
      dangerouslySetInnerHTML={{ __html: FlagSVG }}
    />
  );
}

interface Props {
  phoneNumbers: Phonenumber[];
  number: string;
}
