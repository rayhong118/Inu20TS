import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearAlert } from "../../../redux/actions/alert";
import { AppState } from "../../../redux/store";
import { AlertObj } from "../../tools/types";
import "./alert.scss";

const Alert = () => {
  const [alertConfig, setAlertConfig] = useState<AlertObj>({ duration: 0 });
  const [fade, setFade] = useState(false);
  const dispatch = useDispatch();

  const alert: AlertObj = useSelector((state: AppState) => ({
    ...state.alertReducer,
  }));

  useEffect(() => {
    if (alert.duration) {
      setAlertConfig({ ...alert });
      let durationInMs = alert.duration * 1000;
      setTimeout(() => {
        dispatch(clearAlert());
        setFade(false);
      }, durationInMs);
      setTimeout(() => {
        setFade(true);
      }, durationInMs - 2000);
    } else {
      setAlertConfig({ duration: 0 });
    }
    // eslint-disable-next-line
  }, [alert.message]);

  if (alertConfig.duration)
    return (
      <div className={`alert-container ${fade ? "alert-container-fade" : ""}`}>
        <div className={`alert-box ${alertConfig.type || "notice"}`}>
          {alertConfig.message}
        </div>
      </div>
    );
  else return null;
};
export default Alert;
