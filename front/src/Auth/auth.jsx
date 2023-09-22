import React from 'react'
import "./auth.scss"

const Auth = () => {
  return (
    <div className="wrapper">
      <div className="header">
        <h3 className="sign-in">Sign in</h3>
        <div className="button">Register</div>
      </div>
      <div className="clear"></div>
      <form action="#">
        <div>
          <label className="user" htmlFor="name">
            <svg viewBox="0 0 32 32">
              <g filter="">
                <use xlinkHref="#man-people-user"></use>
              </g>
            </svg>
          </label>
          <input className="user-input" type="text" name="name" id="name" placeholder="My name is" />
        </div>
        <div>
          <label className="lock" htmlFor="password">
            <svg viewBox="0 0 32 32">
              <g filter="">
                <use xlinkHref="#lock-locker"></use>
              </g>
            </svg>
          </label>
          <input type="password" name="password" id="password" placeholder="" />
        </div>
        <div>
          <input type="submit" value="Sign in" />
        </div>
        <div className="radio-check">
          <input type="radio" className="radio-no" id="no" name="remember" value="no" checked />
          <label htmlFor="no"><i className="fa fa-times"></i></label>
          <input type="radio" className="radio-yes" id="yes" name="remember" value="yes" />
          <label htmlFor="yes"><i className="fa fa-check"></i></label>
          <span className="switch-selection"></span>
        </div>
        <span className="check-label">Remember me</span>
        <span className="forgot-label">Lost your password?</span>
        <div className="clear"></div>
      </form>
    </div>
  );
}

export default Auth