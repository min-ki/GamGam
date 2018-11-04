import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
// import LoginForm from "components/LoginForm";
// import SignupForm from "components/SignupForm";
import Card from "components/Card";



const Auth = (props, context) => (
  <main className={styles.auth}>
    <figure className={styles.figure}></figure>
    <figure className={styles.figure}></figure>
    <figure className={styles.figure}></figure>
    <figure className={styles.figure}></figure>
    <figure className={styles.figure}></figure>
    
    <div>
      <Card />
    </div>
  </main>
);

Auth.contextTypes = {
  t: PropTypes.func.isRequired,
};

 export default Auth;
