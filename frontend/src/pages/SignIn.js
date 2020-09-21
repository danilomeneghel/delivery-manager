import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";
import { login } from "../services/auth";
import { TextField, Button } from "@material-ui/core";
import { Form, Container } from "../styles/form";

class SignIn extends Component {
  
  state = {
    username: "",
    password: "",
    success: "",
    error: ""
  }

  handleSignIn = async e => {
    e.preventDefault()
    const { username, password } = this.state
    if (!username || !password) {
      this.setState({ error: "Fill in the Username and Password fields", success: "" })
    } else {
      try {
        const response = await api.post("/signIn", { username, password })
        login(response.data.token)
        this.props.history.push("/")
      } catch (err) {
        this.setState({ error: "Username or Password is invalid", success: "" })
      }
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignIn}>
          {this.state.success && <p>{this.state.success}</p>}
          {this.state.error && <p>{this.state.error}</p>}
          <TextField
            type="text"
            label="Username"
            variant="outlined"
            onChange={e => this.setState({ username: e.target.value })}
            fullWidth
          /><br /><br />
          <TextField
            type="password"
            label="Password"
            variant="outlined"
            onChange={e => this.setState({ password: e.target.value })}
            fullWidth
          /><br /><br />
          <Button type="submit" fullWidth>Sign In</Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(SignIn);