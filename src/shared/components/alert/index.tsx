import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../redux/store";
import { AlertObj } from "../../tools/types";
import "./alert.scss";

const alertTypes = ["warning", "notice", "success"];

const Alert = () => {
  const [alertConfig, setAlertConfig] = useState({});

  const alert: AlertObj = useSelector((state: AppState) => ({
    ...state.alertReducer,
  }));

  useEffect(() => {
    if (alert) {
      setAlertConfig(alert);
    }
  }, [alert.duration]);

  if (alertConfig)
    return <div className="alert-container">This is an alert!</div>;
  else return null;
};
export default Alert;
