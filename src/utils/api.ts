import Axios from "axios";
import {
  AvailablePhoneNumber,
  Country,
  LoginPayload,
  Phonenumber,
} from "./types";

const SERVER_URL = "https://moticosolutions.com/";
// const SERVER_URL = "http://localhost:8080/";

export const axios = Axios.create({
  baseURL: SERVER_URL,
  timeout: 5000,
});

export const login = async (
  email: string,
  password: string
): Promise<LoginPayload> => {
  const data = await axios.post("/api/login", {
    email,
    password,
  });
  return data.data;
};

export const resetPassword = async (
  oldPassword: string,
  newPassword: string,
  userId: string
) => {
  return axios
    .post("/api/reset-password", {
      oldPassword,
      newPassword,
      userId,
    })
    .then((data) => data.data);
};

export const getToken = () => {
  const stringified = localStorage.getItem("TOKEN");
  if (!stringified) {
    throw new Error("TOKEN NOT FOUND");
  } else {
    const parsedToken: {
      token: string;
      validTill: number;
    } = JSON.parse(stringified);
    if (parsedToken.validTill > new Date().getTime()) {
      return parsedToken.token;
    }
    // If token expired -> redirect to logout
    window.location.href = "/logout";
  }
};

export const getOnlineUsers = async (): Promise<
  {
    id: string;
    name: string;
    avatarURL?: string;
  }[]
> => {
  const token = getToken();
  return await axios
    .get("/api/admin/user/online", {
      headers: { authorization: "Bearer " + token },
    })
    .then((data) => data.data);
};

export const twillioToken = async () => {
  const token = getToken();
  return await axios
    .get("/api/twillio/token", {
      headers: { authorization: "Bearer " + token },
    })
    .then((data) => data.data.token as string);
};

export const callConnectId = async (from: string, to: string) => {
  const token = getToken();
  return await axios
    .post(
      "/api/twillio/outgoing/start",
      {
        from,
        to,
      },
      {
        headers: { authorization: "Bearer " + token },
      }
    )
    .then(
      (data) =>
        data.data as {
          callRecordID: string;
        }
    );
};

export const callAnalytics = async () => {
  const token = getToken();
  return await axios
    .get("/api/call/analytics", {
      headers: { authorization: "Bearer " + token },
    })
    .then((data) => data.data);
};

const toDayEnd = () => {
  const date = new Date();
  date.setHours(23, 59, 59);
  return date;
};

export const callAnalyticsCummulated = async () => {
  const token = getToken();
  let startTime = toDayEnd().getTime();
  let endTime = startTime - 24 * 60 * 60 * 1000; // minus 1 day
  const data = [];
  for (let i = 0; i < 10; ++i) {
    const dayData = await axios
      .post(
        "/api/call/time",
        {
          startTime: endTime,
          endTime: startTime,
        },
        {
          headers: { authorization: "Bearer " + token },
        }
      )
      .then(
        (data) =>
          data.data as { inbound: number; outgoing: number; missed: number }
      );
    const day = new Date(startTime);
    data.push({ ...dayData, label: day.toDateString() });
    startTime -= 24 * 60 * 60 * 1000;
    endTime -= 24 * 60 * 60 * 1000;
  }
  return data.reverse();
};

export const getRegisteredPhone = () => {
  const token = getToken();
  return axios
    .get("/api/phonenumber/registered", {
      headers: {
        authorization: "Bearer " + token,
      },
    })
    .then((data) => data.data as Phonenumber[]);
};

export const getAvailablePhoneNumbers = (
  country: Country["code"],
  type: "LOCAL" | "TOLLFREE" | "MOBILE",
  areaCode?: number,
  region?: string
) => {
  const token = getToken();
  return axios
    .post(
      "/api/twillio/phonenumber/search",
      {
        country,
        type,
        areaCode,
        region,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => data.data as AvailablePhoneNumber[]);
};

export const buyNumber = (
  phoneNumber: string,
  name: string,
  country: Country["code"],
  area: string
) => {
  const token = getToken();
  return axios
    .post(
      "/api/twillio/phonenumber/buy",
      {
        phoneNumber,
        name,
        country,
        area,
      },
      {
        headers: {
          authorization: "Bearer " + token,
        },
      }
    )
    .then((data) => data.data as Phonenumber);
};
