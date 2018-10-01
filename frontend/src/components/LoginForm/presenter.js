import React from "react";
import PropTypes from "prop-types";
import formStyles from "shared/formStyles.scss";

// login Form
const LoginForm = (props, context) => (
  <div className={formStyles.formComponent}>
    <form className={formStyles.form} onSubmit={props.handleSubmit}>
      <input 
        type="text" 
        placeholder={context.t("Username")} 
        className={formStyles.textInput}
        value={props.usernameValue}
        onChange={props.handleInputChange}
        name="username"
      />    
      <input 
        type="password" 
        placeholder={context.t("Password")} 
        className={formStyles.textInput} 
        value={props.passwordValue}
        onChange={props.handleInputChange}
        name="password"
      />

      <input type="submit" value={context.t("Log in")} className={formStyles.button} />    
    </form>
    <span className={formStyles.divider}>{context.t("or")}</span>
    <span className={formStyles.forgotLink}>{context.t("Forgot password?")}</span>
  </div>
);

LoginForm.propTypes = {
  usernameValue: PropTypes.string.isRequired,
  passwordValue: PropTypes.string.isRequired,
  handleInputChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

LoginForm.contextTypes = {
  t: PropTypes.func.isRequired,
};

export default LoginForm;