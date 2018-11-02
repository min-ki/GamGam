import React, { Component } from "react";
import ReactTextTransition, { presets } from "react-text-transition";
import styles from './styles.scss';
import Modal from 'react-modal';
import ModalsSignin from 'components/ModalsSignin';
import ModalsSignup from 'components/ModalsSignup';


const texts = [
  "둘러보세요",
  "계획하세요",
  "시작하세요", 
  "추억하세요",
  "함께해요"
];

class Card extends Component {
  state = {
    textIndex: 0,
    textFastIndex: 0,
    paragraphIndex: 0,
    modalIsOpen_1 : false,
    modalIsOpen_2 : false,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({
        textIndex: this.state.textIndex + 1,
      });
    }, 6000);
    setInterval(() => {
      this.setState({
        textFastIndex: this.state.textFastIndex + 1
      });
    }, 150);
  }

  openModal_1=()=>{
    this.setState({
      modalIsOpen_1: true
    });
  }

  openModal_2=()=>{
    this.setState({
      modalIsOpen_2: true
    });
  }

  closeModal_1=()=>{
    this.setState({
      modalIsOpen_1: false
    });
  }

  closeModal_2=()=>{
    this.setState({
      modalIsOpen_2: false
    });
  }

  render() {
    return (
        <section className={styles.mainContainer}>
          <img src={require("images/logo.png")} className={styles.logo}/>

          <div className={styles.subContainer_1}>
            <h1 className={styles.textStop}>여행을</h1>
            <ReactTextTransition
              text={texts[this.state.textIndex % texts.length]}
              spring={presets.gentle}
              className={styles.textTrans}
              inline
              delay={300}
              overflow
            />
          </div>

        <div className={styles.subContainer_2}>
          <button onClick={this.openModal_1} className={styles.button}>로그인</button>

          <Modal isOpen={this.state.modalIsOpen_1}
            onAfteOpen={this.afterOpenModal}
            onRequestClose={this.closeModal_1}
            contentLabel="Signin Modal"
            className={styles.modalContainer}
          >
            <ModalsSignin />
            <button onClick={this.closeModal_1} className={styles.modalButton}>닫기</button>
          </Modal>

          <button onClick={this.openModal_2} className={styles.button}>회원가입</button>

          <Modal isOpen={this.state.modalIsOpen_2}
            onAfteOpen={this.afterOpenModal}
            onRequestClose={this.closeModal_2}
            contentLabel="Signup Modal"
            className={styles.modalContainer}
          >
            <ModalsSignup />
            <button onClick={this.closeModal_2} className={styles.modalButton}>닫기</button>
          </Modal>
        </div>
      </section>
    );
  }
}

export default Card;