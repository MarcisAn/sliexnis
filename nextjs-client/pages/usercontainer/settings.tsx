import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import Template from "../../components/Template";
import Head from "next/head";
export default function settings() {
  if (process.env.NODE_ENV == "production") {
    fetch(
      "https://api.telegram.org/bot2114478706:AAFofCxBbeY9PLXoRRG4enAlmmg7eSODMfA/sendMessage?chat_id=-1001739946551&text=" +
        "Atvērti uzstādījumi"
    );
  }
  return (
    <PrivateRoute>
      <Head>
        <title>Sliexnis | Uzstādījumi</title>
      </Head>
      <Template></Template>
    </PrivateRoute>
  );
}
