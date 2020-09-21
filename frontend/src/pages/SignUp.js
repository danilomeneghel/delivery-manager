import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import api from "../services/api";
import { TextField, InputAdornment, Button } from "@material-ui/core";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import EmailIcon from '@material-ui/icons/Email';
import PersonIcon from '@material-ui/icons/Person';
import LockIcon from '@material-ui/icons/Lock';
import { Form, Container } from "../styles/form";

class SignUp extends Component {
  
  state = {
    name: "",
    email: "",
    username: "",
    password: "",
    role: "user",
    status: "active",
    success: "",
    error: ""
  }

  handleSignUp = async e => {
    e.preventDefault()
    const { name, username, email, password, role, status } = this.state
    if (!username || !email || !password) {
      this.setState({ error: "Fill in all the data to register", success:"" })
    } else {
      await api.post("/signUp", { name, username, email, password, role, status })
      .then(response => {
        if(response.data.success) {
          this.setState({ success: response.data.success, error: "" })
        } else {
          this.setState({ error: "Registration error", success: "" })
        }
      })
      .catch(err => {
        this.setState({ error: "Registration error or User already registered", success: "" })
      })
    }
  }

  render() {
    return (
      <Container>
        <Form onSubmit={this.handleSignUp}>
          {this.state.success && <p>{this.state.success}</p>}
          {this.state.error && <p>{this.state.error}</p>}
          
          <TextField
            type="text"
            placeholder="Name"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <AccountCircleIcon />
                </InputAdornment>
              ),
            }}
            onChange={e => this.setState({ name: e.target.value })}
            fullWidth
            required
          /><br /><br />

          <TextField
            type="email"
            placeholder="E-mail"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <EmailIcon />
                </InputAdornment>
              ),
            }}
            onChange={e => this.setState({ email: e.target.value })}
            fullWidth
            required
          /><br /><br />

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
            required
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
            required
          /><br /><br />
          
          <Button type="submit" fullWidth>Sign Up</Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(SignUp);