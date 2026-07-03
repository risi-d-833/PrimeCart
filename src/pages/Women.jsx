import React from "react";
import PopularProducts from "../components/PopularProducts";
import Newsletter from "../components/Newsletter";

export default function Women() {
  return (
    <>
      <section style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1>Women&apos;s Collection</h1>
        <p>Browse timeless fashion with everyday comfort.</p>
      </section>
      <PopularProducts />
      <Newsletter />
    </>
  );
}
