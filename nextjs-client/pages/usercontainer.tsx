import React from "react";
import Head from "next/head";
import UserContainer from "../components/UserContainer";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";

export default function dashboard() {
  const auth = getAuth();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <h2>Ielādējās...</h2>;
  } else {
    if (user) {
      return (
        <div>
          <Head>
            <title>Sliexnis</title>
          </Head>
          <UserContainer />
        </div>
      );
    } else {
      router.replace("/");
      return <span />;
    }
  }
}
