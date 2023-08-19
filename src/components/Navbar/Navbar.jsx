import styles from "./Navbar.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { HealthMrmContext } from "../../context/healthmrmContext";

const Navbar = () => {
  const { connectWallet, currentAccount } = useContext(HealthMrmContext);
  useEffect(() => {
    console.log("hello0", currentAccount);
  }, [currentAccount]);

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>Health MRM</div>
      <div className={styles.navbar__links}>
        <div className={styles.spacer}> </div>
        <div
          className={`${styles.btn} ${styles.connect}`}
          onClick={async () => {
            await connectWallet();
          }}
        >
          {currentAccount === ""
            ? "Connect Wallet"
            : `${currentAccount.toString().slice(0, 6)}...${currentAccount
                .toString()
                .slice(-4)}`}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
