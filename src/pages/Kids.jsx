import React from "react";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";

export default function Kids() {
  return (
    <>
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1>Kids&apos; Collection</h1>
        <p>Fun, comfortable pieces for every adventure.</p>
      </section>
      <PopularProducts />
      <Newsletter />
    </>
  );
}
