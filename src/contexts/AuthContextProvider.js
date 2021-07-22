import React, { createContext, useEffect, useState } from "react";
import { userObserver } from "../helpers/firebase";
import { getAllPosts } from "../helpers/firestore";

export const AuthContext = createContext();

const AuthContextProvider = (props) => {
  const [allPosts, setAllPosts] = useState([]);

  const [currentUser, setCurrentUser] = useState({
    displayName: "",
    email: "",
    date: "",
    uid: "",
  });
  useEffect(() => {
    getAllPosts(setAllPosts);
    userObserver(setCurrentUser);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser, allPosts, setAllPosts }}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
