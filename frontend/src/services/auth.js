import React from 'react'
import  { Redirect } from 'react-router-dom'

export const TOKEN_KEY = "jwt";
export const isAuthenticated = () => localStorage.getItem(TOKEN_KEY) !== null;
export const getToken = () => localStorage.getItem(TOKEN_KEY);
export const login = token => {
  localStorage.setItem(TOKEN_KEY, token);
};
export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  return <Redirect to='/login'  />
};
export const getUserLogged = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (token) { 
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  } else {
    return null;
  }
};