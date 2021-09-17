import React, { useState } from "react";
import DataTable from "react-data-table-component";
import ScrollMenu from "react-horizontal-scrolling-menu";
import {
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import ReactModal from "react-modal";
import { useQuery } from "react-query";
import { getRegisteredPhone } from "../utils/api";
import { PhoneSettings } from "../utils/types";
import Button from "./Button";
import { Card } from "./Card/Card";

export default function IVRSettings({
  data,
  setData,
}: {
  data: PhoneSettings | null;
  setData: (data: PhoneSettings | null) => void;
}) {
  const [ivrData, setIvrData] = useState<
    { phoneNumberId: string; label: string }[]
  >(() => JSON.parse(data?.ivrData ?? JSON.stringify([])) ?? []);
  const { data: numberData } = useQuery("registeredPhone", () => {
    return getRegisteredPhone();
  });
  const [showModal, setShowModal] = useState(false);
  const numbers = numberData?.filter(
    (num) => num._id !== data?.phoneNumber._id
  );
  const savedData: { phoneNumberId: string; label: string }[] =
    data && data.ivrData ? JSON.parse(data.ivrData) : [];
  // JSON.parse(data?.ivrData ?? JSON.stringify([])) ?? [];
  return (
    <>
      <Card.Body
        background="dark"
        style={{ padding: "1em", borderRadius: "8px", color: "white" }}
      >
        <h4>IVR Settings</h4>
        <div style={{ marginTop: "1em" }}>
          <ScrollMenu
            data={savedData.map(({ label, phoneNumberId }, index) => {
              return (
                <div style={{ margin: 10 }}>
                  {label && (
                    <>
                      <div
                        style={{
                          height: 50,
                          width: 50,
                          borderRadius: 25,
                          backgroundColor: "lightgray",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          margin: 10,
                        }}
                      >
                        <h2 style={{ color: "black" }}>{index + 1}</h2>
                      </div>
                      <div style={{ textAlign: "center" }}>{label}</div>
                    </>
                  )}
                </div>
              );
            })}
            wrapperStyle={{ width: "100%" }}
            arrowLeft={<MdKeyboardArrowLeft size={32} />}
            arrowRight={<MdKeyboardArrowRight size={32} />}
          />
        </div>
        <Button onClick={() => setShowModal(!showModal)}>Edit</Button>
      </Card.Body>
      <ReactModal
        isOpen={showModal}
        style={{
          overlay: {
            zIndex: 10,
          },
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1em",
          }}
        >
          <h3>IVR Menu</h3>
          <MdClose
            onClick={() => {
              setShowModal(false);
              setIvrData(JSON.parse(data?.ivrData ?? JSON.stringify([])) ?? []);
            }}
            style={{ cursor: "pointer" }}
          />
        </div>
        <div style={{ marginTop: "2em", padding: "1em" }}>
          <DataTable
            data={
              numbers?.map((num, idx) => {
                return { number: num, idx };
              }) ?? []
            }
            columns={[
              {
                name: "Press",
                selector: (row) => row.idx + 1,
              },
              {
                name: "Redirect To",
                cell: (row) => {
                  const filteredNumbers = numbers?.filter((num) => {
                    return !ivrData.find((d) => d.phoneNumberId === num._id);
                  });
                  return (
                    <select
                      style={{
                        padding: "0.5em",
                        borderRadius: "8px",
                        outline: "none",
                      }}
                      value={ivrData[row.idx]?.phoneNumberId ?? "None"}
                      onChange={(e) => {
                        setIvrData((oldData) => {
                          const localData = [...oldData];
                          localData[row.idx] = {
                            phoneNumberId: e.target.value,
                            label: "",
                          };
                          return localData;
                        });
                      }}
                    >
                      {Boolean(ivrData[row.idx]?.phoneNumberId) &&
                      ivrData[row.idx]?.phoneNumberId !== "None" ? (
                        <option value={ivrData[row.idx].phoneNumberId}>
                          {
                            numbers?.find(
                              (num) =>
                                num._id === ivrData[row.idx].phoneNumberId
                            )?.number
                          }
                        </option>
                      ) : null}
                      {filteredNumbers?.map((num) => {
                        return <option value={num._id}>{num.number}</option>;
                      })}
                      <option value="None">None</option>
                    </select>
                  );
                },
              },
              {
                name: "Label",
                cell: (row) => (
                  <input
                    type="text"
                    disabled={
                      !ivrData[row.idx] ||
                      ivrData[row.idx].phoneNumberId === "None"
                    }
                    value={ivrData[row.idx]?.label ?? ""}
                    onChange={(e) =>
                      setIvrData((oldData) => {
                        const local = [...oldData];
                        local[row.idx].label = e.target.value;
                        return local;
                      })
                    }
                    style={{ padding: "0.5em" }}
                    placeholder="Marketing"
                  />
                ),
              },
            ]}
          />
        </div>
        <div style={{ marginTop: "1em" }}>
          <Button
            disabled={ivrData.some(
              (val) => val.phoneNumberId !== "None" && val.label.length === 0
            )}
            onClick={() => {
              setData(
                data
                  ? {
                      ...data,
                      ivrData: JSON.stringify(ivrData),
                    }
                  : null
              );
              setShowModal(false);
            }}
          >
            Save
          </Button>
        </div>
      </ReactModal>
    </>
  );
}
