import React from "react";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

// signup Form
const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>{context.t("친구의 사진과 동영상을 보려면 등록하십시오.")}</h3>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input 
        name="email" 
        type="email" 
        placeholder={context.t("이메일")}
        value={props.emailValue} 
        className={formStyles.textInput}
        onChange={props.handleInputChange}
      />
      <input 
        name="name" 
        type="text" 
        placeholder={context.t("아이디")}
        value={props.nameValue} 
        className={formStyles.textInput}
        onChange={props.handleInputChange}
      />
      <input 
        name="username" 
        type="username" 
        value={props.usernameValue}
        placeholder={context.t("닉네임")} 
        className={formStyles.textInput} 
        onChange={props.handleInputChange}
      />
      <input 
        name="password" 
        type="password" 
        placeholder={context.t("비밀번호")}
        value={props.passwordValue} 
        className={formStyles.textInput} 
        onChange={props.handleInputChange}
      />
      <input type="submit" value={context.t("회원가입")} className={formStyles.button} onChange={props.handleSubmit} />
    </form>
    <p className={formStyles.terms}>
        {context.t("가입하면 당사의 이용약관 및 개인정보")} <br/> <span>{context.t("보호정책에 동의합니다.")}</span>
    </p>
  </div>
);

SignupForm.propTypes = {
  emailValue: PropTypes.string.isRequired,
  nameValue: PropTypes.string.isRequired,
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

SignupForm.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default SignupForm;