import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

class Login extends Component {
  
    componentDidMount() {
        document.querySelector("#contents").children[0].style.display = 'block'
        document.querySelector(".tabs").children[0].classList.add("selected")
    }

    tab = (event) => {
        var id = event.target.id
        var indice = id.replace('tab', '')
        var idTab = '#tab'+indice
        var idContent = '#content'+indice
        
        /* eslint eqeqeq: 0 */
        var idTabParent = (indice == 1) ? '#tab2' : '#tab1'
        var idContentParent = (indice == 1) ? '#content2' : '#content1'

        document.querySelector(idTabParent).classList.remove("selected")
        document.querySelector(idTab).classList.add("selected")
        
        document.querySelector(idContentParent).style.display = 'none'
        document.querySelector(idContent).style.display = 'block'
    }
    
    render() {
        return (
            <Fragment>
                <div className="container-login">
                    <div className="logo-login"></div>
                    <div className="panel">
                        <div className="box-login">
                            <div className="tabs">
                                <div className="tab" id="tab1" onClick={e => this.tab(e)}>
                                    Sign In
                                </div>
                                <div className="tab" id="tab2" onClick={e => this.tab(e)}>
                                    Sign Up
                                </div>
                            </div>

                            <div id="contents" className="panel-body">
                                <div className="content" id="content1">
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

                                <div className="content" id="content2">
                                    <div className="form-panel">
                                        <SignUp />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        )
    }
}

export default withRouter(Login);