import React from "react";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

// signup Form
const SignupForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <h3 className={formStyles.signupHeader}>{context.t("Sign up to see photos and videos from your friends.")}</h3>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input 
        name="email" 
        type="email" 
        placeholder={context.t("Email")}
        value={props.emailValue} 
        className={formStyles.textInput}
        onChange={props.handleInputChange}
      />
      <input 
        name="name" 
        type="text" 
        placeholder={context.t("Name")}
        value={props.nameValue} 
        className={formStyles.textInput}
        onChange={props.handleInputChange}
      />
      <input 
        name="username" 
        type="username" 
        value={props.usernameValue}
        placeholder={context.t("Username")} 
        className={formStyles.textInput} 
        onChange={props.handleInputChange}
      />
      <input 
        name="password" 
        type="password" 
        placeholder={context.t("Password")}
        value={props.passwordValue} 
        className={formStyles.textInput} 
        onChange={props.handleInputChange}
      />
      <input type="submit" value={context.t("Sign up")} className={formStyles.button} onChange={props.handleSubmit} />
    </form>
    <p className={formStyles.terms}>
        {context.t("By signing up, you agree to our")} <span>{context.t("Terms & Privacy Policy")}</span>.
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