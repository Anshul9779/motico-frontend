import React from "react";
import { countries } from "./utils/countries";
import { ReactSearchAutocomplete } from "react-search-autocomplete";
import { useHistory } from "react-router";
import { Country } from "./utils/types";
import WorldMap from "./images/World_Map.jpeg";

export default function NumberCountry() {
  const history = useHistory();
  return (
    <div style={{ display: "flex", margin: "1em", position: "relative" }}>
      <img
        src={WorldMap}
        alt="World Map"
        style={{
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 0,
          width: "100%",
        }}
      />
      <div
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          zIndex: 2,
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
          zIndex: 2,
          paddingTop: "4em",
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
