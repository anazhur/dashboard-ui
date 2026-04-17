import React from "react";
import { IoSettingsOutline } from "react-icons/io5";
import s from "./index.module.scss";

const Meta = () => {
  return (
    <div className={s.meta}>
      <div className={s.logo}><img src="/assets/logo.svg" alt="logo"/></div>
      <div className={s.metaBottom}>
        <button className={`${s.settingsBtn} pressable`}>
          <IoSettingsOutline />
        </button>
      </div>
    </div>
  );
};

export default Meta;
