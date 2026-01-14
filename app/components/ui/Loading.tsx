import React from "react";
import { Rings } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="w-full flex justify-center items-center h-[250]">
      {/* <InfinitySpin width="200" color="#FE9A00" /> */}
      <Rings
        visible={true}
        height="80"
        width="80"
        color="#FE9A00"
        ariaLabel="rings-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loading;
