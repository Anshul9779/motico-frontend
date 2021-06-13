import React from "react";
import { countries } from "./utils/countries";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useHistory } from "react-router";
import { Country } from "./utils/types";

export default function NumberCountry() {
  const history = useHistory();
  return (
    <div style={{ display: "flex", margin: "1em" }}>
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <h2>Select Country For Number</h2>
        <p>Click on right corner Flag to select the country number</p>
        <div style={{ width: 400 }}>
          <ReactSearchAutocomplete
            items={countries}
            onSelect={(selectedCountry: Country) => {
              history.push("/numbers/search/" + selectedCountry.code);
            }}
          />
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flex: 1,
          flexWrap: "wrap",
          gap: "1em",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {countries.map((country) => {
          const image = require(`./${country.imagePath}`).default;
          return (
            <div
              key={country.code}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                flexDirection: "column",
                objectFit: "contain",
                width: 30,
                margin: 10,
                cursor: "pointer",
              }}
              onClick={() => {
                history.push("/numbers/search/" + country.code);
              }}
            >
              <img src={image} alt={country.name} />
              {/* <div>{country.name}</div> */}
            </div>
          );
        })}
      </div>
    </div>
  );
}
