import React from 'react'
import Header from './Header';

const PaymentFailed = () => {
  return (
    <>
      <Header />

      <div className="h-96 flex flex-col justify-center items-center">
        <img src="failed.gif" alt="" className="h-60" />
        <h1 className="text-3xl text-red-400 font-extrabold">
          Payment Failed
        </h1>
      </div>
    </>
  );
}

export default PaymentFailed