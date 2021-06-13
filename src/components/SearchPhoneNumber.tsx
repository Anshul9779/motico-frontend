import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { getAvailablePhoneNumbers } from "../utils/api";
import { canadaState, countries, usaState } from "../utils/countries";
import { Country, AvailablePhoneNumber } from "../utils/types";
import PhoneNumberCard from "./PhoneNumberCard";

const getImageByCountryCode = (code: Country["code"]): Country["imagePath"] => {
  return countries.filter((c) => c.code === code)[0].imagePath;
};

export default function SearchPhoneNumber() {
  const { countryCode }: { countryCode: string } = useParams();
  const [areaCode, setAreaCode] = useState("");
  const [region, setRegion] = useState("");
  const [type, setType] = useState<"LOCAL" | "TOLLFREE" | "MOBILE">("LOCAL");
  const [searchBy, setSearchBy] = useState<"AREACODE" | "REGION">("AREACODE");
  const [results, setResults] = useState<AvailablePhoneNumber[]>([]);

  useEffect(() => {
    let _areaCode = undefined;
    let _region = undefined;
    if (areaCode && areaCode.length === 3 && searchBy === "AREACODE") {
      try {
        _areaCode = Number.parseInt(areaCode);
      } catch (error) {
        _areaCode = undefined;
      }
    } else if (region && region.length === 2 && searchBy === "REGION") {
      _region = region;
    }

    getAvailablePhoneNumbers(countryCode, type, _areaCode, _region).then(
      (data) => setResults(data)
    );
  }, [countryCode, type, areaCode, searchBy, region]);
  return (
    <div style={{ margin: "2em 3em" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "1em",
        }}
      >
        <div>
          Type :{" "}
          <select
            name="Type"
            id=""
            value={type}
            onChange={(e) =>
              setType(e.target.value as "LOCAL" | "TOLLFREE" | "MOBILE")
            }
            style={{
              outline: "none",
              border: "none",
              padding: "0.5em",
              borderRadius: "1em",
            }}
          >
            <option value="LOCAL">Local</option>
            <option value="TOLLFREE">Toll Free</option>
            <option value="MOBILE">Mobile</option>
          </select>
        </div>
        <div>
          Search By :{" "}
          <select
            name="Search By"
            id=""
            disabled={!(countryCode === "US" || countryCode === "CA")}
            value={searchBy}
            onChange={(e) =>
              setSearchBy(e.target.value as "AREACODE" | "REGION")
            }
            style={{
              outline: "none",
              border: "none",
              padding: "0.5em",
              borderRadius: "1em",
            }}
          >
            <option value="AREACODE">Area Code</option>
            <option value="REGION">Region</option>
          </select>
        </div>
        <div>
          {searchBy === "AREACODE" ? (
            <input
              disabled={!(countryCode === "US" || countryCode === "CA")}
              type="number"
              placeholder="Area Code"
              value={areaCode}
              onChange={(e) => setAreaCode(e.target.value)}
              maxLength={3}
              style={{
                padding: "0.5em",
                border: "none",
                outline: "none",
                borderRadius: "1em",
              }}
            />
          ) : (
            <select
              name="Region"
              id=""
              disabled={!(countryCode === "US" || countryCode === "CA")}
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              style={{
                outline: "none",
                border: "none",
                padding: "0.5em",
                borderRadius: "1em",
              }}
            >
              {countryCode === "CA"
                ? canadaState.map((state) => {
                    return (
                      <option
                        value={state.abbreviation}
                        key={state.abbreviation + "CA" + state.name}
                      >
                        {state.name}
                      </option>
                    );
                  })
                : usaState.map((state) => {
                    return (
                      <option
                        value={state.abbreviation}
                        key={state.abbreviation + "US" + state.name}
                      >
                        {" "}
                        {state.name}
                      </option>
                    );
                  })}
            </select>
          )}
        </div>
      </div>
      <div
        style={{
          marginTop: "1em",
          backgroundColor: "white",
          border: "1px solid #EEE",
          padding: "1em",
          display: "flex",
          flexWrap: "wrap",
          borderRadius: "0.5em",
        }}
      >
        {results.map((number, index) => {
          return (
            <PhoneNumberCard
              phoneNumber={number}
              imagePath={getImageByCountryCode(countryCode)}
              key={index}
            />
          );
        })}
      </div>
    </div>
  );
}
