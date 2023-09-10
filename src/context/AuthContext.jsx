import { createContext, useReducer } from "react";

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
      user: undefined,
      token: undefined,
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
    user: undefined,
    token: undefined,
    authIsReady: false,
  });
  console.log("AuthContext: ", state);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
