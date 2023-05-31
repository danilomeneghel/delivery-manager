import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";
import { login } from "../services/auth";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
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
            placeholder="Username"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon />
                </InputAdornment>
              ),
            }}
            onChange={e => this.setState({ username: e.target.value })}
            fullWidth
          /><br /><br />

          <TextField
            type="password"
            placeholder="Password"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <LockIcon />
                </InputAdornment>
              ),
            }}
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