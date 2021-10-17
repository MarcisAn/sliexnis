import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Sliexnis</title>
        <meta
          name="description"
          content="Applikācija skolas darbu pārvaldībai"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Sliexnis</h1>
    </div>
  );
};

export default Home;
