import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import Toggle from "react-toggle";
import AWSUploader from "../components/AWSUploader";
import { Card } from "../components/Card/Card";
import IVRSettings from "../components/IVRSettings";
import { axios, getToken } from "../utils/api";
import { BasicUser, PhoneSettings } from "../utils/types";
import Music from "../images/music_messages.png";
import Voicemail from "../images/Voicemail.png";
import IVRImage from "../images/IVR_Image.png";

export default function Settings() {
  const { id }: { id: string } = useParams();
  const [setting, setSetting] = useState<PhoneSettings | null>(null);
  const userQuery = useQuery("users", () => {
    return axios
      .post(
        "/api/admin/user/get-company",
        {},
        {
          headers: { authorization: "Bearer " + getToken() },
        }
      )
      .then((data) => data.data as BasicUser[]);
  });
  const query = useQuery(
    "settings_" + id,
    () => {
      const token = getToken();
      return axios
        .post(
          "/api/phonenumber/settings/",
          { number: id },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then((data) => data.data as PhoneSettings);
    },
    {
      staleTime: 30 * 60 * 60 * 1000,
      onSuccess: (_data) => setSetting(_data),
    }
  );
  const refetch = useRef(false);
  useEffect(() => {
    if (refetch.current) {
      const token = getToken();
      axios
        .put(
          "/api/phonenumber/settings/",
          { setting: { ...setting, phoneNumber: setting?.phoneNumber._id } },
          {
            headers: {
              authorization: "Bearer " + token,
            },
          }
        )
        .then(() => {
          refetch.current = false;
          query.refetch();
        });
    }
  }, [setting]);

  return (
    <div style={{ paddingBottom: "2em" }}>
      <section style={{ display: "flex", gap: "1em", margin: "2em" }}>
        <div style={{ flex: 1 }}>
          <div>
            <Card.Body
              background="gradient"
              style={{
                padding: "1em",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <h3>Record Calls</h3>
              <div
                style={{ display: "flex", gap: "3em", padding: "3em 0.75em" }}
              >
                <img
                  src="https://play-lh.googleusercontent.com/tTwEQlDdhoklHXZyvNqTZ8JrSSZbm9YuDC7L57wGnYt35GJsKNR6sQ9MxtXECyXZNwUZ"
                  alt=""
                  style={{
                    width: 100,
                    height: 100,
                    flex: 1,
                  }}
                />
                <div>
                  <p>
                    Automatically record all the calls. Please check legality in
                    your region
                  </p>
                  <Toggle
                    checked={setting?.canRecord}
                    onChange={() => {
                      setSetting((oldSetting) => {
                        if (!oldSetting) {
                          return null;
                        }
                        return {
                          ...oldSetting,
                          canRecord: !oldSetting?.canRecord,
                        };
                      });
                      refetch.current = true;
                    }}
                  />
                </div>
              </div>
            </Card.Body>
          </div>
          <div>
            <Card.Body
              background="orange"
              style={{
                padding: "1em",
                borderRadius: "8px",
                marginTop: "1em",
                color: "white",
              }}
            >
              <h3>Grant Recording access to Users</h3>
              <p style={{ marginTop: "2em" }}>
                Allow users to pause or resume the recording of call. This
                prevents recording of user's sensitive information whenever he
                wants
              </p>
              <Toggle
                checked={setting?.canPause}
                onChange={() => {
                  setSetting((oldSetting) => {
                    if (!oldSetting) {
                      return null;
                    }
                    return {
                      ...oldSetting,
                      canPause: !oldSetting?.canPause,
                    };
                  });
                  refetch.current = true;
                }}
              />
            </Card.Body>
          </div>
        </div>
        <div style={{ flex: 1 }}>
          <Card.Body
            background="dark"
            style={{
              height: "90%",
              padding: "1em",
              borderRadius: "8px",
              color: "white",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <h3>Number Confirmation</h3>
            <p>Verification is compulsory. Submit address proof if required</p>
            <div
              style={{
                backgroundColor: "#6E376E",
                color: "white",
                padding: "1em",
                borderRadius: "0.4em",
                fontWeight: "bold",

                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              {setting?.documentStatus}
            </div>
          </Card.Body>
        </div>
      </section>
      <section style={{ margin: "2em", marginTop: "8em" }}>
        <div style={{ marginTop: "8em", display: "flex", gap: "1em" }}>
          <div style={{ flex: 2 }}>
            <Card.Body
              background="light"
              style={{
                padding: "1em",
                borderRadius: "8px",
                color: "white",
                backgroundColor: "#D3617B",
              }}
            >
              <h3>Music and Messages</h3>
              <div
                style={{
                  marginTop: "1em",
                  gap: "1em",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: "0.5em",
                }}
              >
                <img src={Music} alt="" style={{ width: 100, height: 100 }} />
                <div>
                  <h4>Greeting Message</h4>
                  <div
                    style={{
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                    }}
                  >
                    <p>Welcome users with a greeting.</p>
                    <Toggle
                      icons={false}
                      checked={setting?.greetingMessageStatus !== "DISABLED"}
                      onChange={() => {
                        setSetting((oldSetting) => {
                          if (!oldSetting) {
                            return null;
                          }
                          if (oldSetting.greetingMessageStatus === "DISABLED") {
                            return {
                              ...oldSetting,
                              greetingMessageStatus: "TEXT",
                            };
                          }
                          return {
                            ...oldSetting,
                            greetingMessageStatus: "DISABLED",
                          };
                        });
                        refetch.current = true;
                      }}
                    />
                  </div>
                  <form>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5em",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="greeting"
                          id="text"
                          disabled={
                            setting?.greetingMessageStatus === "DISABLED"
                          }
                          checked={setting?.greetingMessageStatus === "TEXT"}
                          onClick={() => {
                            setSetting((oldSetting) => {
                              if (!oldSetting) {
                                return null;
                              }
                              return {
                                ...oldSetting,
                                greetingMessageStatus: "TEXT",
                                greetingMessageInfo: "",
                              };
                            });
                            refetch.current = true;
                          }}
                        />
                        <label htmlFor="text">Text</label>
                        {setting?.greetingMessageStatus === "TEXT" && (
                          <input
                            type="text"
                            style={{
                              marginLeft: "0.5em",
                              padding: "0.5em 1em",
                              outline: "none",
                              border: "none",
                              borderRadius: "0.5em",
                            }}
                            value={setting.greetingMessageInfo}
                            onChange={(e) => {
                              setSetting((oldSetting) => {
                                if (!oldSetting) {
                                  return null;
                                }
                                return {
                                  ...oldSetting,
                                  greetingMessageInfo: e.target.value,
                                };
                              });
                              refetch.current = true;
                            }}
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5em",
                          alignItems: "center",
                          marginTop: "1em",
                        }}
                      >
                        <input
                          type="radio"
                          name="greeting"
                          id="audio"
                          disabled={
                            setting?.greetingMessageStatus === "DISABLED"
                          }
                          checked={setting?.greetingMessageStatus === "AUDIO"}
                          onClick={() => {
                            setSetting((oldSetting) => {
                              if (!oldSetting) {
                                return null;
                              }
                              return {
                                ...oldSetting,
                                greetingMessageStatus: "AUDIO",
                                greetingMessageInfo: "",
                              };
                            });
                            refetch.current = true;
                          }}
                        />
                        <label htmlFor="audio">Audio</label>
                        {setting?.greetingMessageStatus === "AUDIO" && (
                          <AWSUploader
                            awsKey={`${id}/greeting`}
                            initialURL={setting.greetingMessageInfo}
                            accept="audio/*"
                            onComplete={(key) => {
                              console.log("Uploaded", key);
                              setSetting((oldSetting) => {
                                if (!oldSetting) {
                                  return null;
                                }
                                return {
                                  ...oldSetting,
                                  greetingMessageInfo: key,
                                };
                              });
                              refetch.current = true;
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Card.Body>
          </div>
          <div>
            <Card.Body
              style={{
                padding: "1em",
                height: "85%",
                borderRadius: "8px",
                border: "2px solid gray",
                flex: 1,
              }}
            >
              <h4>Language</h4>
              <select
                name=""
                id=""
                disabled={setting?.greetingMessageStatus !== "TEXT"}
                style={{
                  padding: "0.5em",
                  backgroundColor: "#6E376E",
                  color: "white",
                  outline: "none",
                  borderRadius: "0.4em",
                }}
              >
                <option value="">English (USA)</option>
                <option value="">English (UK)</option>
                <option value="">English (India)</option>
              </select>
              <div style={{ marginTop: "1.5em" }}>
                <form>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="radio"
                        name="greeting"
                        id="male"
                        disabled={setting?.greetingMessageStatus !== "TEXT"}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                        marginTop: "1em",
                      }}
                    >
                      <input
                        type="radio"
                        name="greeting"
                        id="audio"
                        disabled={setting?.greetingMessageStatus !== "TEXT"}
                      />
                      <label htmlFor="audio">Female</label>
                    </div>
                  </div>
                </form>
              </div>
            </Card.Body>
          </div>
        </div>
        <div style={{ marginTop: "2em" }}>
          <Card.Body
            background="dark"
            style={{
              padding: "1em",
              borderRadius: "8px",
              color: "white",
              paddingBottom: "2em",
            }}
          >
            <h4>Voicemail</h4>

            <div
              style={{
                marginTop: "1em",
                display: "flex",
                gap: "1em",
                marginLeft: "10em",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <p>Set your voicemail message</p>
              <Toggle
                checked={setting?.voiceMailStatus !== "DISABLED"}
                onChange={() => {
                  setSetting((oldSetting) => {
                    if (!oldSetting) {
                      return null;
                    }
                    if (oldSetting.voiceMailStatus === "DISABLED") {
                      return {
                        ...oldSetting,
                        voiceMailStatus: "TEXT",
                      };
                    }
                    return {
                      ...oldSetting,
                      voiceMailStatus: "DISABLED",
                    };
                  });
                  refetch.current = true;
                }}
              />
            </div>
            <div
              style={{
                marginTop: "1em",
                marginLeft: "3em",
                marginBottom: "1em",
                display: "flex",
                gap: "1em",
              }}
            >
              <img
                src={Voicemail}
                alt=""
                style={{ width: 200, objectFit: "contain" }}
              />
              <div style={{ flex: 2, marginLeft: "5em" }}>
                <form>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="radio"
                        name="greeting"
                        id="voicemailText"
                        disabled={setting?.voiceMailStatus === "DISABLED"}
                        checked={setting?.voiceMailStatus === "TEXT"}
                        onClick={() => {
                          setSetting((oldSetting) => {
                            if (!oldSetting) {
                              return null;
                            }
                            return {
                              ...oldSetting,
                              voiceMailStatus: "TEXT",
                              voiceMailInfo: "",
                            };
                          });
                          refetch.current = true;
                        }}
                      />
                      <label htmlFor="voicemailText">Text</label>
                      {setting?.voiceMailStatus === "TEXT" && (
                        <input
                          type="text"
                          style={{
                            marginLeft: "0.5em",
                            padding: "0.5em 1em",
                            outline: "none",
                            border: "none",
                            borderRadius: "0.5em",
                          }}
                          value={setting.voiceMailInfo}
                          onChange={(e) => {
                            setSetting((oldSetting) => {
                              if (!oldSetting) {
                                return null;
                              }
                              return {
                                ...oldSetting,
                                voiceMailInfo: e.target.value,
                              };
                            });
                            refetch.current = true;
                          }}
                        />
                      )}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                        marginTop: "1em",
                      }}
                    >
                      <input
                        type="radio"
                        name="greeting"
                        id="voicemailAudio"
                        disabled={setting?.voiceMailStatus === "DISABLED"}
                        checked={setting?.voiceMailStatus === "AUDIO"}
                        onClick={() => {
                          setSetting((oldSetting) => {
                            if (!oldSetting) {
                              return null;
                            }
                            return {
                              ...oldSetting,
                              voiceMailStatus: "AUDIO",
                              voiceMailInfo: "",
                            };
                          });
                          refetch.current = true;
                        }}
                      />
                      <label htmlFor="voicemailAudio">Audio</label>
                      {setting?.voiceMailStatus === "AUDIO" && (
                        <AWSUploader
                          awsKey={`${id}/voicemail`}
                          initialURL={setting.voiceMailInfo}
                          accept="audio/*"
                          onComplete={(key) => {
                            setSetting((oldSetting) => {
                              if (!oldSetting) {
                                return null;
                              }
                              return {
                                ...oldSetting,
                                voiceMailInfo: key,
                              };
                            });
                            refetch.current = true;
                          }}
                        />
                      )}
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </Card.Body>
        </div>
      </section>
      <section style={{ margin: "2em", marginTop: "8em" }}>
        <div style={{ marginTop: "8em", display: "flex", gap: "1em" }}>
          <div style={{ flex: 2 }}>
            <Card.Body
              background="light"
              style={{
                padding: "1em",
                borderRadius: "8px",
                color: "white",
              }}
            >
              <h3>IVR</h3>
              <div
                style={{
                  marginTop: "1em",
                  gap: "1em",
                  display: "flex",
                  justifyContent: "space-around",
                  alignItems: "center",
                  marginBottom: "0.5em",
                }}
              >
                <img
                  src={IVRImage}
                  alt=""
                  style={{ width: 150, height: 150, objectFit: "contain" }}
                />
                <div>
                  <div
                    style={{
                      display: "flex",
                      gap: "1em",
                      alignItems: "center",
                    }}
                  >
                    <h4>IVR Message</h4>
                    <Toggle
                      icons={false}
                      checked={setting?.ivrStatus !== "DISABLED"}
                      onChange={() => {
                        setSetting((oldSetting) => {
                          if (!oldSetting) {
                            return null;
                          }
                          if (oldSetting.ivrStatus === "DISABLED") {
                            return {
                              ...oldSetting,
                              ivrStatus: "TEXT",
                            };
                          }
                          return {
                            ...oldSetting,
                            ivrStatus: "DISABLED",
                          };
                        });
                        refetch.current = true;
                      }}
                    />
                  </div>
                  <form>
                    <div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5em",
                          alignItems: "center",
                        }}
                      >
                        <input
                          type="radio"
                          name="greeting"
                          id="ivrTEXT"
                          disabled={setting?.ivrStatus === "DISABLED"}
                          checked={setting?.ivrStatus === "TEXT"}
                          onClick={() => {
                            setSetting((oldSetting) => {
                              if (!oldSetting) {
                                return null;
                              }
                              return {
                                ...oldSetting,
                                ivrStatus: "TEXT",
                                ivrInfo: "",
                              };
                            });
                            refetch.current = true;
                          }}
                        />
                        <label htmlFor="ivrTEXT">Text</label>
                        {setting?.ivrStatus === "TEXT" && (
                          <input
                            type="text"
                            style={{
                              marginLeft: "0.5em",
                              padding: "0.5em 1em",
                              outline: "none",
                              border: "none",
                              borderRadius: "0.5em",
                            }}
                            value={setting.ivrInfo}
                            onChange={(e) =>
                              setSetting((oldSetting) => {
                                if (!oldSetting) {
                                  return null;
                                }
                                return {
                                  ...oldSetting,
                                  ivrInfo: e.target.value,
                                };
                              })
                            }
                          />
                        )}
                      </div>
                      <div
                        style={{
                          display: "flex",
                          gap: "0.5em",
                          alignItems: "center",
                          marginTop: "1em",
                        }}
                      >
                        <input
                          type="radio"
                          name="greeting"
                          id="ivrAUDIO"
                          disabled={setting?.ivrStatus === "DISABLED"}
                          checked={setting?.ivrStatus === "AUDIO"}
                          onClick={() => {
                            setSetting((oldSetting) => {
                              if (!oldSetting) {
                                return null;
                              }
                              return {
                                ...oldSetting,
                                ivrStatus: "AUDIO",
                                ivrInfo: "",
                              };
                            });
                            refetch.current = true;
                          }}
                        />
                        <label htmlFor="ivrAUDIO">Audio</label>
                        {setting?.ivrStatus === "AUDIO" && (
                          <AWSUploader
                            awsKey={`${id}/ivr`}
                            initialURL={setting.greetingMessageInfo}
                            accept="audio/*"
                            onComplete={(key) => {
                              setSetting((oldSetting) => {
                                if (!oldSetting) {
                                  return null;
                                }
                                return {
                                  ...oldSetting,
                                  greetingMessageInfo: key,
                                };
                              });
                              refetch.current = true;
                            }}
                          />
                        )}
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </Card.Body>
          </div>
          <div>
            <Card.Body
              style={{
                padding: "1em",
                height: "85%",
                borderRadius: "8px",
                border: "2px solid gray",
                flex: 1,
              }}
            >
              <h4>Language</h4>
              <select
                name=""
                id=""
                disabled={setting?.ivrStatus !== "TEXT"}
                style={{
                  padding: "0.5em",
                  backgroundColor: "#6E376E",
                  color: "white",
                  outline: "none",
                  borderRadius: "0.4em",
                }}
              >
                <option value="">English (USA)</option>
                <option value="">English (UK)</option>
                <option value="">English (India)</option>
              </select>
              <div style={{ marginTop: "1.5em" }}>
                <form>
                  <div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                      }}
                    >
                      <input
                        type="radio"
                        name="greeting"
                        id="male"
                        disabled={setting?.ivrStatus !== "TEXT"}
                      />
                      <label htmlFor="male">Male</label>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5em",
                        alignItems: "center",
                        marginTop: "1em",
                      }}
                    >
                      <input
                        type="radio"
                        name="greeting"
                        id="audio"
                        disabled={setting?.ivrStatus !== "TEXT"}
                      />
                      <label htmlFor="audio">Female</label>
                    </div>
                  </div>
                </form>
              </div>
            </Card.Body>
          </div>
        </div>
        <div style={{ marginTop: "2em" }}>
          {setting?.ivrStatus !== "DISABLED" && (
            <IVRSettings
              data={setting}
              setData={(newData) => {
                setSetting(newData);
                refetch.current = true;
              }}
            />
          )}
        </div>
      </section>
      <section style={{ margin: "2em", marginTop: "8em" }}>
        <Card.Body
          style={{
            padding: "1em",
            borderRadius: "8px",
            border: "2px solid gray",
          }}
        >
          <h3>Assign Users</h3>
          <p style={{ marginTop: "1em" }}>Assign this phone number to users</p>
          <div style={{ marginTop: "1em" }}>
            {userQuery.data?.map((user) => {
              return (
                <div
                  key={user.id}
                  style={{ display: "flex", gap: "1em", alignItems: "center" }}
                >
                  <input
                    type="checkbox"
                    id={"user_" + user.id}
                    checked={setting?.phoneNumber.assignedTo.includes(user.id)}
                    onChange={() => {
                      setSetting((oldSetting) => {
                        if (!oldSetting) {
                          return null;
                        }
                        if (
                          oldSetting?.phoneNumber.assignedTo.includes(user.id)
                        ) {
                          return {
                            ...oldSetting,
                            phoneNumber: {
                              ...oldSetting.phoneNumber,
                              assignedTo:
                                oldSetting.phoneNumber.assignedTo.filter(
                                  (p) => p !== user.id
                                ),
                            },
                          };
                        }
                        return {
                          ...oldSetting,
                          phoneNumber: {
                            ...oldSetting.phoneNumber,
                            assignedTo: [
                              ...oldSetting.phoneNumber.assignedTo,
                              user.id,
                            ],
                          },
                        };
                      });
                      refetch.current = true;
                    }}
                  />
                  <label htmlFor={"user_" + user.id}>
                    {user.firstName + user.lastName ?? ""}
                  </label>
                </div>
              );
            })}
          </div>
        </Card.Body>
      </section>
      <section style={{ margin: "2em", marginTop: "8em" }}>
        <div style={{ display: "flex", gap: "1em" }}>
          <div style={{ flex: 1 }}>
            <Card.Body
              background="light"
              style={{
                padding: "1em",
                borderRadius: "8px",
                color: "white",
                height: "100%",
              }}
            >
              <h3>Extension Numbers</h3>
              <div>
                <p>
                  Enables after IVR Settings. 3-digit changeable number assigned
                  to every user; visible from Settings
                </p>
              </div>
            </Card.Body>
          </div>
          <div style={{ flex: 1 }}>
            <Card.Body
              background="dark"
              style={{
                padding: "1em",
                borderRadius: "8px",
                color: "white",
                height: "100%",
              }}
            >
              <h3>Call Queueing</h3>
              <p>
                Manage multiple incoming calls via Queueing feature. Users can
                send voicemails
              </p>
              <div style={{ marginTop: "1.5em" }}>
                <Toggle
                  checked={setting?.callQueing}
                  onChange={() => {
                    setSetting((oldSetting) => {
                      if (!oldSetting) {
                        return null;
                      }
                      return {
                        ...oldSetting,
                        callQueing: !oldSetting.callQueing,
                      };
                    });
                    refetch.current = true;
                  }}
                />
              </div>
            </Card.Body>
          </div>
        </div>
      </section>
    </div>
  );
}
