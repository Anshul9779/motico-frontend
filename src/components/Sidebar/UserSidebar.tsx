import React from "react";
import Logo from "../../images/MotiCo Logo.png";
import SideTitle from "./SideTitle";
import { MdDashboard, MdPeople } from "react-icons/md";
import { AiFillHeart, AiOutlineFieldNumber } from "react-icons/ai";
export default function UserSidebar() {
  return (
    <div style={{ padding: "1.5rem" }}>
      <img
        src={Logo}
        alt="MotiCo"
        style={{ objectFit: "contain", width: "100%" }}
      />
      <div style={{ marginTop: "4rem" }}>
        <SideTitle Icon={MdDashboard} title={"Dashboard"} link="/" />
        <SideTitle
          Icon={AiOutlineFieldNumber}
          title={"numbers"}
          link="/numbers"
        />

        <SideTitle Icon={MdPeople} title={"users"} link="/users" />
        <SideTitle Icon={AiFillHeart} title={"teams"} link="/teams" />
        <SideTitle Icon={AiOutlineFieldNumber} title={"numbers"} link="/call" />
        <SideTitle Icon={MdPeople} title={"users"} link="/" />
        <SideTitle Icon={AiFillHeart} title={"teams"} link="/" />
      </div>
    </div>
  );
}
