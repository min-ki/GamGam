import React from "react";
import styles from "./styles.scss"


const Card = props => {
    return (
      <div className={styles.cardContainer}>
        <img src={require("images/phone.png")} className={styles.phone} alt="phone" />
        <div className={styles.cardList1}>
          <h1 className={styles.cardTitle}>
            STEP 1. 둘러보기
          </h1>
          <div className={styles.subContainer}>
            <h2 className={styles.cardSubTitle}>타인의 모험을 들여다 보세요.</h2>
            <h2 className={styles.cardSubTitle}>당신의 모험에 도움이 될 거에요.</h2>
          </div>
        </div>
        <div className={styles.cardList2}>
          <h1 className={styles.cardTitle}> STEP 2. 계획하기 </h1>
          <div className={styles.subContainer}>
            <h2 className={styles.cardSubTitle}>일정 계획이 막막하진 않나요?</h2>
            <h2 className={styles.cardSubTitle}>'감감'이 도와줄게요.</h2>
          </div>
        </div>
        <div className={styles.cardList3}>
          <h1 className={styles.cardTitle}> STEP 3. 여행하기 </h1>
          <div className={styles.subContainer}>
            <h2 className={styles.cardSubTitle}>새로운 세상과 만날 준비됐나요?</h2>
            <h2 className={styles.cardSubTitle}>'감감'과 함께해요.</h2>
          </div>
        </div>
        <div className={styles.cardList4}>
          <h1 className={styles.cardTitle}>STEP 4. 추억하기</h1>
          <div className={styles.subContainer}>
            <h2 className={styles.cardSubTitle}>되새겨보세요. <br/>돌이켜보세요.</h2>
            <h2 className={styles.cardSubTitle}>다시 시작해보세요.</h2>
          </div>
        </div>
      </div>
    );
};

export default Card;
