import React from "react";
import style from "./Noprop.module.css";

const ErrorNoprop = () => {
  return (
    <div className={style.container404}>
      <h3 className={style.str404}>UPS! That’s an error</h3>
      <h2 className={style.titleError}>Add Favourites first</h2>
    </div>
  );
};

export default ErrorNoprop;
