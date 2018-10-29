import React from "react";
import PropTypes from "prop-types";
import Ionicon from "react-ionicons";
import { Link } from "react-router-dom";
import styles from "./styles.scss";

const Navigation = (props, context) => {
  return <div className={styles.navigation}>
      <div className={styles.inner}>
        <div className={styles.column}>
          <Link to="/">
            <img src={require("images/logo.png")} className={styles.logo} alt={context.t("Logo")} />
          </Link>
        </div>
        {/* <div className={styles.column}>
            <input
              type="text"
              placeholder={context.t("Search")}
              className={styles.searchInput}
            />
            <Ionicon className={"search"} icon="ios-search" fontSize="28px" color="black" />
          </div> */}
        <div className={styles.column}>
          <div className={styles.navIcon}>
            <Link to="/feed" className={styles.link}>
              <Ionicon className={"menu"} icon="md-menu" fontSize="28px" color="black" />
            </Link>
          </div>
          <div className={styles.navContainer}>
            <div className={styles.navIcon}>
              <Link to="/feed" className={styles.link}>
                {context.t("둘러보기")}
              </Link>
            </div>
            <div className={styles.navIcon}>
              <Link to="/plan" className={styles.link}>
                {context.t("계획하기")}
              </Link>
            </div>
            <div className={styles.navIcon}>
              <Link to="/travel" className={styles.link}>
                {context.t("여행하기")}
              </Link>
            </div>
            <div className={styles.navIcon}>
              <Link to="/timeline" className={styles.link}>
                {context.t("추억하기")}
              </Link>
            </div>
            <div className={styles.navIcon}>
              <Link to="/logout" className={styles.link}>
                {context.t("로그아웃")}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};

Navigation.contextTypes = {
  t: PropTypes.func.isRequired
};

export default Navigation;
