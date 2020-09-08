import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class Login extends Component {
  
  render() {
    return (
        <Fragment>
            <div class="container-login">
                <div class="logo-login"></div>
                <div class="panel">
                    <div class="box-login">
                        <div class="tabs">
                            <div class="tab">
                                <span>Sign In</span>
                            </div>
                            <div class="tab">
                                <span>Sign Up</span>
                            </div>
                        </div>

                        <div id="contents" class="panel-body">
                            <div class="content">
                                <div class="form-panel">
                                    <SignIn />
                                    <br /><br />
                                    <div class="text-center">
                                        <div class="login-teste">Login de Teste:</div>
                                        Usuário: admin<br />
                                        Senha: admin123<br />
                                    </div>
                                </div>
                            </div>

                            <div class="content">
                                <div class="form-panel">
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