import React from "react";
import ReactLoading from "react-loading";

const Loading = () => {
  return (
    <ReactLoading
      type={"bubbles"}
      color={"#dcedc1"}
      height={"100%"}
      width={"100%"}
      className="loading"
    />
  );
};

export default Loading;