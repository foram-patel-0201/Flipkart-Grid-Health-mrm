import styles from "./Navbar.module.scss";
import React, { useContext, useEffect, useState } from "react";
import { HealthMrmContext } from "../../context/healthmrmContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { connectWallet, currentAccount, role } = useContext(HealthMrmContext);
  useEffect(() => {
    console.log("hello0", currentAccount);
  }, [currentAccount]);
  const navigate = useNavigate();

  return (
    <div className={styles.navbar}>
      <div className={styles.navbar__logo}>Health MRM</div>

      <div className={styles.navbar__links}>
        <div className={styles.spacer}>
          {role === "" ? (
            <>
              <div
                className={styles.link}
                onClick={() => {
                  navigate("/");
                }}
              >
                Login
              </div>
              <div
                className={styles.link}
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Sign up
              </div>
            </>
          ) : (
            <div
              className={styles.link}
              onClick={() => {
                navigate("/Home");
              }}
            >
              Home
            </div>
          )}
        </div>
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
