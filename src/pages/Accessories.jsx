import React from "react";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";

export default function Accessories() {
  return (
    <>
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1>Accessories</h1>
        <p>Discover stylish add-ons that complete every look.</p>
      </section>
      <PopularProducts />
      <Newsletter />
    </>
  );
}
