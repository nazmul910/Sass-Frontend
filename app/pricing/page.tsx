"use client";

import api from "../../utils/axios";

export default function Pricing() {
  const handleBuy = async (amount: number) => {
    const userId = localStorage.getItem("userId");

    const res = await api.post("/payment", {
      userId,
      amount,
    });

    const data = res.data;

    //  SSLCommerz redirect
    const form = document.createElement("form");
    form.method = "POST";
    form.action = data.gatewayURL;

    Object.keys(data.payload).forEach((key) => {
      const input = document.createElement("input");
      input.name = key;
      input.value = data.payload[key];
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <>
      <button onClick={() => handleBuy(10)}>Basic</button>
      <button onClick={() => handleBuy(100)}>Standard</button>
      <button onClick={() => handleBuy(1000)}>Premium</button>
    </>
  );
}