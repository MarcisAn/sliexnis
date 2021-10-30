import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import Template from "../../components/Template";
import Head from "next/head";
export default function settings() {
  return (
    <PrivateRoute>
      <Head>
        <title>Sliexnis | Uzstādījumi</title>
      </Head>
      <Template></Template>
    </PrivateRoute>
  );
}
