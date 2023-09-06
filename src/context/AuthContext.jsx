import { createContext, useEffect, useReducer } from "react";

export const AuthContext = createContext();

const authReducer = (state, action) => {
  if (action.type === "LOGIN")
    return {
      ...state,
      user: action.payload,
      token: action.token,
    };

  if (action.type === "LOGOUT")
    return {
      ...state,
      user: null,
      token: null,
    };
  if (action.type === "AUTH_IS_READY")
    return {
      ...state,
      user: action.payload,
      token: action.token,
      authIsReady: true,
    };

  return state;
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    token: null,
    authIsReady: false,
  });
  console.log("AuthContext: ", state);

  useEffect(() => {
    dispatch({type: 'AUTH_IS_READY'})
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
