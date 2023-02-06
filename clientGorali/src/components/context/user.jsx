import React, { createContext, useReducer } from "react";
import axios from "axios";
import { baseURL } from "./../../config";

export const UserContext = createContext();

const userReducer = (state = {}, action) => {
  const { type, payload } = action; // Type of action, payload => the info
  switch (type) {
    case "ADD_USER":
      state = payload;
      break;
    case "DELETE_USER":
      state = { username: "guest" };
      break;
    case "UPDATE_USER":
      state = payload;
      break;
    case "LOG_IN":
      state = payload;
      break;
    case "LOG_OUT":
      state = { username: "guest" };
      break;

    default:
      break;
  }
  return state;
};

const UserProvider = ({ children }) => {
  const [user, dispatch] = useReducer(userReducer, { name: "guest" });

  // === Sign up === //
  const signup = async (userObj) => {
    const result = await axios.post(`${baseURL}/users`, userObj);
    const { data } = result;
    dispatch({
      type: "ADD_USER",
      payload: data,
    });
  };

  // === Log in === //
  const login = async (userObj) => {
    const result = await axios.post(`${baseURL}/users/login`, userObj);
    const data = result.json();
    dispatch({
      type: "LOG_IN",
      payload: data,
    });
  };

  // === Log out === //
  const logout = async () => {
    dispatch({ type: "LOG_OUT", payload: {} });
  };
  // === Delete user === //
  const deleteUser = async (userObj) => {
    const result = await axios.delete(`${baseURL}/users/${userObj.id}`, userObj);
    const { data } = result;
    dispatch({
      type: "DELETE_USER",
      payload: data,
    });
  };

  // === Update user === //
  const updateUser = async (userObj) => {
    const result = await axios.put(`${baseURL}/users`, userObj);
    const { data } = result;
    dispatch({
      type: "UPDATE_USER",
      payload: data,
    });
  };

  return (
    <UserContext.Provider
      value={{ user, login, signup, logout, deleteUser, updateUser }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
