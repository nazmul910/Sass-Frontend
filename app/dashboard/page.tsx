"use client";

import api from "../../utils/axios";

export default function Dashboard() {
  const getFeature = async (url: string) => {
    try {
      const res = await api.get(url);
      alert(res.data.message);
    } catch (err) {
      alert("Access Denied");
    }
  };

  return (
    <>
      <button onClick={() => getFeature("/features/feature1")}>
        Feature 1
      </button>

      <button onClick={() => getFeature("/features/feature2")}>
        Feature 2
      </button>

      <button onClick={() => getFeature("/features/feature3")}>
        Feature 3
      </button>
    </>
  );
}