import React from "react";
import Header from "./Header";

const PaymentSuccess = () => {
  return (
    <>
      <Header />

      <div className="h-96 flex flex-col justify-center items-center">
        <img src="success.gif" alt="" className="h-60" />
        <h1 className="text-3xl text-green-400 font-extrabold">Payment Success</h1>
      </div>
    </>
  );
};

export default PaymentSuccess;
