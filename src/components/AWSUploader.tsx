import React, { useEffect, useState } from "react";
import { axios, getToken } from "../utils/api";

export default function AWSUploader({
  awsKey,
  initialURL,
  onComplete,
  accept,
}: {
  initialURL: string;
  awsKey: string;
  onComplete: (path: string) => void;
  accept?: string;
}) {
  const [status, setStatus] = useState<"UPLOADING" | "SHOW_URL" | "NO_FILE">(
    () => {
      if (initialURL.length > 0) {
        return "SHOW_URL";
      } else {
        return "NO_FILE";
      }
    }
  );
  const [file, setSelectedFile] = useState<File | null>(null);

  useEffect(() => {
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("key", awsKey);
    const token = getToken();
    axios
      .post("/api/aws/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: "Bearer " + token,
        },
      })
      .then((uploadData) => {
        onComplete(uploadData.data.key);
      });
  }, [file]);

  useEffect(() => {
    console.log("Initial url", initialURL);
    if (initialURL.length > 0) {
      setStatus("SHOW_URL");
    } else {
      setStatus("NO_FILE");
    }
  }, [initialURL]);

  if (status === "SHOW_URL") {
    return (
      <div style={{ display: "flex", gap: "0.5em" }}>
        <a
          href={"http://localhost:8080/api/aws/" + initialURL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Open File
        </a>
        <span>or</span>
        <button onClick={() => setStatus("NO_FILE")}>Change File</button>
      </div>
    );
  }

  if (status === "NO_FILE") {
    return (
      <div>
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const selectedFile = e.target.files?.[0];
            if (selectedFile) {
              setSelectedFile(selectedFile);
              setStatus("UPLOADING");
            }
          }}
        />
      </div>
    );
  }
  return <div>Uploading...</div>;
}
