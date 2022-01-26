import React from "react";
import LeftSidebar from "./LeftSidebar";
import Logo from "./../images/MotiCo Logo.png";
import DataTable from "react-data-table-component";
import { SERVER_URL } from "../utils/api";
import { useCallVoicemails } from "./useCallVoicemails";
import { useHistory } from "react-router-dom";

function timeConversion(duration: number) {
  const portions: string[] = [];

  const msInHour = 1000 * 60 * 60;
  const hours = Math.trunc(duration / msInHour);
  if (hours > 0) {
    portions.push(hours + "h");
    duration = duration - hours * msInHour;
  }

  const msInMinute = 1000 * 60;
  const minutes = Math.trunc(duration / msInMinute);
  if (minutes > 0) {
    portions.push(minutes + "m");
    duration = duration - minutes * msInMinute;
  }

  const seconds = Math.trunc(duration / 1000);
  if (seconds > 0) {
    portions.push(seconds + "s");
  }

  return portions.join(" ");
}

function CallVoicemail() {
  const { data } = useCallVoicemails();
  const history = useHistory();

  return (
    <div>
      <div style={{ display: "flex" }}>
        <div
          style={{
            backgroundColor: "#2B3144",
            minHeight: "100vh",
            width: "15vw",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <img
            src={Logo}
            alt="MotiCo"
            onClick={() => history.push("/")}
            style={{
              objectFit: "contain",
              width: "80%",
              padding: "1em",
              cursor: "pointer",
            }}
          />
          <LeftSidebar />
        </div>
        <div
          style={{
            flex: 1,
            display: "flex",
            minHeight: "100vh",
            flexDirection: "column",
          }}
        >
          <DataTable
            customStyles={{
              headRow: {
                style: {
                  background: "#2B3243",
                  padding: "0 8px",
                },
              },
              headCells: {
                style: {
                  color: "white",
                },
              },
              rows: {
                style: {
                  background: "rgb(239, 243, 244)",
                  border: "1px solid rgba(255,0,0,0.5)",
                  padding: "0 16px",
                },
              },
            }}
            columns={[
              {
                name: "Name",
                selector: (row) => row.user.name,
              },
              {
                name: "Type",
                selector: (row) => row.type,
              },
              {
                name: "From",
                selector: (row) => row.from,
              },
              {
                name: "To",
                selector: (row) => row.to,
              },
              {
                name: "Duration",
                selector: (row) => timeConversion(row.duration || 0),
              },
              {
                name: "Recording",
                selector: (row) => row.recordingURL,
                cell: (row) => {
                  if (!row.recordingURL) {
                    return "NA";
                  }
                  return (
                    <audio controls>
                      <source
                        src={`${SERVER_URL}api/aws/${row.recordingURL}`}
                        type="audio/ogg"
                      />
                    </audio>
                  );
                },
              },
            ]}
            data={data ?? []}
          />
        </div>
      </div>
    </div>
  );
}

export default CallVoicemail;
