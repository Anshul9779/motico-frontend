import React from "react";
import { MdAccountCircle } from "react-icons/md";
import Toggle from "react-toggle";
import Button from "./components/Button";
import { Card } from "./components/Card/Card";
import Input from "./components/Input";
import { useForm, useMe, useSetMe } from "./utils/hooks";

export default function Profile() {
  const { data } = useMe();
  const [form, setForm] = useForm({
    firstName: data?.firstName ?? "",
    lastName: data?.lastName ?? "",
    phoneNumber: data?.phoneNumber ?? "",
    email: data?.email ?? "",
  });

  const [settings, setSettings] = useForm({
    reciveUpdates: data?.reciveUpdates ?? false,
    missedCallAlert: data?.missedCallAlert ?? false,
    voicemailAlert: data?.voicemailAlert ?? false,
    dashboard: data?.dashboard ?? false,
    dialler: data?.dialler ?? false,
  });

  const { mutate } = useSetMe();

  const disabled =
    form.firstName === data?.firstName &&
    form.lastName === data.lastName &&
    form.phoneNumber === data.phoneNumber &&
    form.email === data.email;

  return (
    <div style={{ padding: "1em" }}>
      <Card>
        <Card.Body
          background="gradient"
          style={{
            borderRadius: "0.5em",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5em",
            flexDirection: "column",
          }}
        >
          <MdAccountCircle
            style={{
              fontSize: "10rem",
              color: "rgba(0,0,0,0.7)",
              cursor: "pointer",
            }}
          />

          <div
            style={{
              marginTop: "0.5em",
              display: "flex",
              flex: "column",
              gap: "0.5em",
            }}
          >
            <div>
              <Input
                placeholder="First Name"
                value={form.firstName}
                onChange={(e) => setForm("firstName", e.target.value)}
              />
            </div>
            <div>
              <Input
                placeholder="Last Name"
                value={form.lastName}
                onChange={(e) => setForm("lastName", e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "1em", display: "flex", flex: "column" }}>
            <div>
              <Input
                placeholder="Phone Number"
                value={form.phoneNumber}
                type="number"
                onChange={(e) => setForm("phoneNumber", e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "1em", display: "flex", flex: "column" }}>
            <div>
              <Input
                placeholder="Email"
                type="email"
                value={form.email}
                onChange={(e) => setForm("email", e.target.value)}
              />
            </div>
          </div>
          <div style={{ marginTop: "1em", display: "flex", flex: "column" }}>
            <div>
              <Input
                placeholder="Company"
                value={data?.company.name}
                disabled
              />
            </div>
          </div>
          <div style={{ marginTop: "2em", display: "flex", flex: "column" }}>
            <Button
              title="Save"
              disabled={disabled}
              onClick={() => {
                if (!disabled) mutate(form);
              }}
            />
          </div>
        </Card.Body>
      </Card>
      <Card>
        <Card.Body
          background="gradient"
          style={{
            borderRadius: "0.5em",
            flex: 1,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "5em",
            flexDirection: "column",
            marginTop: "4em",
            marginBottom: "4em",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              marginTop: "0.5em",
            }}
          >
            Recive Updates
            <Toggle
              checked={settings.reciveUpdates}
              onChange={(e) =>
                setSettings("reciveUpdates", !settings.reciveUpdates)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              marginTop: "0.5em",
            }}
          >
            Missed Call Alert
            <Toggle
              checked={settings.missedCallAlert}
              onChange={(e) =>
                setSettings("missedCallAlert", !settings.missedCallAlert)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              marginTop: "0.5em",
            }}
          >
            Voicemail Alert
            <Toggle
              checked={settings.voicemailAlert}
              onChange={(e) =>
                setSettings("voicemailAlert", !settings.voicemailAlert)
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              marginTop: "0.5em",
            }}
          >
            Dashboard
            <Toggle
              checked={settings.dashboard}
              onChange={(e) => setSettings("dashboard", !settings.dashboard)}
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "2em",
              marginTop: "0.5em",
            }}
          >
            Dialler
            <Toggle
              checked={settings.dialler}
              onChange={(e) => setSettings("dialler", !settings.dialler)}
            />
          </div>
          <div style={{ marginTop: "2em", display: "flex", flex: "column" }}>
            <Button
              title="Save"
              onClick={() => {
                mutate(settings);
              }}
            />
          </div>
        </Card.Body>
      </Card>
    </div>
  );
}
