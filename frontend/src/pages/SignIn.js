import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";
import { login } from "../services/auth";
import { Form, Container } from "../styles/form";

class SignIn extends Component {
  state = {
    username: "",
    password: "",
    success: "",
    error: ""
  };

  handleSignIn = async e => {
    e.preventDefault();
    const { username, password } = this.state;
    if (!username || !password) {
      this.setState({ error: "Fill in the Username and Password fields" });
    } else {
      try {
        const response = await api.post("/signIn", { username, password });
        login(response.data.token);
        this.props.history.push("/");
      } catch (err) {
        this.setState({
          error: "Username or Password is invalid"
        });
      }
    }
  };

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.success && <p>{this.state.success}</p>}
          {this.state.error && <p>{this.state.error}</p>}
          <i className="fa fa-user"></i>
          <input
            type="username"
            placeholder="Username"
            onChange={e => this.setState({ username: e.target.value })}
            className="input-login"
          />
          <i className="fa fa-lock"></i>
          <input
            type="password"
            placeholder="Password"
            onChange={e => this.setState({ password: e.target.value })}
            className="input-login"
          />
          <button type="submit" className="btn btn-login btn-lg btn-block">Sign In</button>
        </Form>
      </Container>
    );
  }
}

export default withRouter(SignIn);