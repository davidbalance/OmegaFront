'use client'

import styles from "./page.module.css";
import { redirect } from "next/navigation";
import { useLayoutEffect } from "react";

const Home: React.FC = () => {
  useLayoutEffect(() => {
    redirect('login');
  }, []);

  return (
    <main className={styles.main}>
      Loading resources...
    </main>
  );
}

export default Home;