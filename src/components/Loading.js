import React from "react";
import loading from "../assets/loading.gif";

const Loading = () => {
  return (
    <div className="loading">
      <h1>loading...</h1>
      <img src={loading} alt="loading logo" />
    </div>
  );
};

export default Loading;
