import React from "react";
import PropTypes from "prop-types";
import styles from "./styles.scss";
import LoginForm from "components/LoginForm";
import SignupForm from "components/SignupForm";

const Modals = (props, context) => (
  <main className={styles.modalConatiner}>
    <div className={`${styles.whiteBox} ${styles.formBox}`}>
      <img src={require("images/noPhoto.jpg")} alt="Logo" />
      {props.action === "login" && <LoginForm />}
      {props.action === "signup" && <SignupForm />}
    </div>
    <div className={styles.whiteBox}>
      {props.action === "login" && (
        <p>
          {context.t("아직 감감 회원이 아니세요? ")}{" "}
          <span className={styles.changeLink} onClick={props.changeAction}>
            {context.t("회원가입")}
          </span>
        </p>
      )}
      {props.action === "signup" && (
        <p>
          {context.t("감감 회원이신가요? ")}{" "}
          <span className={styles.changeLink} onClick={props.changeAction}>
            {context.t("로그인")}
          </span>
        </p>
      )}
    </div>
  </main>
);

Modals.contextTypes = {
  t: PropTypes.func.isRequired,
};

 export default Modals;
