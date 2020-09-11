import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class Login extends Component {
  
  render() {
    return (
        <Fragment>
            <div className="container-login">
                <div className="logo-login"></div>
                <div className="panel">
                    <div className="box-login">
                        <div className="tabs">
                            <div className="tab">
                                <span>Sign In</span>
                            </div>
                            <div className="tab">
                                <span>Sign Up</span>
                            </div>
                        </div>

                        <div id="contents" className="panel-body">
                            <div className="content">
                                <div className="form-panel">
                                    <SignIn />
                                    <br /><br />
                                    <div className="text-center">
                                        <div className="login-teste">Login de Teste:</div>
                                        Usuário: admin<br />
                                        Senha: admin123<br />
                                    </div>
                                </div>
                            </div>

                            <div className="content">
                                <div className="form-panel">
                                    <SignUp />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
  }
}

export default withRouter(Login);