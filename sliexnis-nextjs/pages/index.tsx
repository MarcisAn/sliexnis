import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Landing from "../components/Landing";

const Home: NextPage = () => {
  return (
    <div>
      <Head>
        <title>Sliexnis</title>
        <meta
          name="description"
          content="Applikācija skolas darbu pārvaldībai"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Landing />
    </div>
  );
};

export default Home;
