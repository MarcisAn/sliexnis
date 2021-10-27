import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import Template from "../../components/Template";

export default function settings() {
  return (
    <PrivateRoute>
      <Template></Template>
    </PrivateRoute>
  );
}
