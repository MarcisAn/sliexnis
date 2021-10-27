import React from "react";
import PrivateRoute from "../../components/PrivateRoute";
import Template from "../../components/Template";

export default function calendar() {
  return (
    <PrivateRoute>
      <Template>
        <h2>Plānotājs</h2>
      </Template>
    </PrivateRoute>
  );
}
