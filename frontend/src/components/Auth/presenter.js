import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";
import Card from "components/Card";

const Auth = (props, context) => (
  <main className={styles.auth}>
    <div className={styles.column2}>
      <div className={`${styles.whiteBox} ${styles.formBox}`}>
        <img src={require("images/logo.png")} alt="Logo" />
        {props.action === "login" && <LoginForm />}
        {props.action === "signup" && <SignupForm />}
      </div>  
      <div className={styles.whiteBox}>
        {props.action === "login" && (
          <p>
            {context.t("Don't have an account?")}{" "}
            <span className={styles.changeLink} onClick={props.changeAction}>
                    {context.t("Sign up")}
            </span>
          </p>
        )}
        {props.action === "signup" && (
          <p>
            {context.t("Have an account?")}{" "}
            <span className={styles.changeLink} onClick={props.changeAction}>
                {context.t("Log in")}
            </span>
          </p>
        )}
      </div>
    </div>
    <div className={styles.column1}>
      <Card />
    </div>
  </main>
);

Auth.contextTypes = {
  t: PropTypes.func.isRequired,
};

 export default Auth;
