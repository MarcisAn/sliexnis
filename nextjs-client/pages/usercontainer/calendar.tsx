import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import Template from "../../components/Template";
import Head from "next/head";
export default function calendar() {
  return (
    <PrivateRoute>
      <Head>
        <title>Sliexnis | Plānotājs</title>
      </Head>
      <Template>
        <h2>Plānotājs</h2>
      </Template>
    </PrivateRoute>
  );
}
