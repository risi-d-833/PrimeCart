import React from "react";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";

export default function Men() {
  return (
    <>
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1>Men&apos;s Collection</h1>
        <p>Explore the latest essentials for modern style.</p>
      </section>
      <PopularProducts />
      <Newsletter />
    </>
  );
}
