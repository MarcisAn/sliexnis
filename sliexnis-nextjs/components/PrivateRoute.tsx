import React from "react";
import { getAuth } from "firebase/auth";
import router from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";

export default function PrivateRoute({ children }: any) {
  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h2>Ielādējās</h2>;
  } else {
    if (user) {
      return children;
    } else {
      router.replace("/");
      return <span />;
    }
  }
}
