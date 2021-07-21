import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import { useHistory } from "react-router";
import { buyNumber } from "../utils/api";
import { Country, AvailablePhoneNumber } from "../utils/types";
import Button from "./Button";
import Input from "./Input";

export interface PhoneNumberCardProps {
  phoneNumber: AvailablePhoneNumber;
  imagePath: Country["imagePath"];
}

export default function PhoneNumberCard({
  phoneNumber,
  imagePath,
}: PhoneNumberCardProps) {
  const {
    phoneNumber: phone_number,
    friendlyName: friendly_name,
    locality,
    isoCountry: iso_country,
  } = phoneNumber;
  const [showModal, setShowModal] = useState(false);
  const [buying, setBuying] = useState(false);
  const [err, setErr] = useState("");
  const history = useHistory();
  const [name, setName] = useState("");

  useEffect(() => {
    if (!buying) {
      return;
    }
    setErr("");
    // Buying number;
    buyNumber(
      phoneNumber.phoneNumber,
      name,
      iso_country,
      `${locality}, ${phoneNumber.region}`
    )
      .then(() => {
        history.push("/numbers");
      })
      .catch((err) => {
        setErr(err);
        setBuying(false);
      });
  }, [buying, history, iso_country, locality, phoneNumber, name]);
  const region = `${locality ?? ""} , ${phoneNumber.region ?? ""}`;
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "1em",
          gap: "0.5em",
          cursor: "pointer",
        }}
        onClick={() => setShowModal(true)}
      >
        <div>
          <img
            src={require(`./../${imagePath}`).default}
            alt={phone_number}
            style={{ width: 70, objectFit: "contain" }}
          />
        </div>
        <div>
          <h4>{friendly_name}</h4>
          <p>{region.length > 10 ? region.substring(0, 10) + "..." : region}</p>
        </div>
      </div>
      <ReactModal
        isOpen={showModal}
        style={{
          overlay: {
            zIndex: 10,
          },
          content: {
            width: "50%",
            height: "52%",
            marginLeft: "auto",
            marginRight: "auto",
          },
        }}
      >
        <div style={{ flex: 1, padding: "1.5em" }}>
          <div style={{ display: "flex", gap: "2em" }}>
            <img
              src={require(`./../${imagePath}`).default}
              alt={phone_number}
              style={{ width: 100, objectFit: "contain" }}
            />
            <h2>Buy this number ?</h2>
          </div>
          <div style={{ marginTop: "1em" }}></div>
          <p>
            <strong>For individuals : </strong> This is a local number. The
            carrier requires you to submit{" "}
            <strong>
              government verified personal proof of ID and address
            </strong>{" "}
            of {region} to activate this number.
          </p>
          <p>
            <strong>For Business : </strong> This is a local number. The carrier
            requires you to submit{" "}
            <strong>
              registered business's government verified personal proof of
              address
            </strong>{" "}
            of {region} to activate this number.
          </p>
        </div>
        {err && (
          <div>
            <p style={{ color: "red" }}>Something went wrong</p>
          </div>
        )}
        <div>
          <Input
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={{ gap: "1em", display: "flex", margin: "1em" }}>
          <Button
            onClick={() => {
              if (name) {
                setBuying(true);
              }
            }}
            loading={buying}
            disabled={!Boolean(name)}
          >
            Buy
          </Button>
          <Button onClick={() => setShowModal(false)}>Cancel</Button>
        </div>
      </ReactModal>
    </>
  );
}
