'use client'

import { Loader } from "@mantine/core";
import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { useEffect } from "react";

const Home: React.FC = () => {
  useEffect(() => {
    redirect('login');
  }, [])

  return (
    <main className={styles.main}>
      <Loader type="dots" />
    </main>
  );
}

export default Home;