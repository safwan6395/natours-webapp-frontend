import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ErrorModal from "../components/ErrorModal";

import PasswordEye from "../components/PasswordEye";

function Login() {
  const { dispatch } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    setError(null);

    try {
      const res = await fetch(`${import.meta.env.VITE_REMOTE_URL}api/v1/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await res.json();

      if (data.status === "fail") throw data;

      localStorage.setItem("jwt", data.token);
      dispatch({ type: "LOGIN", payload: data.data.user, token: data.token });

      navigate("/");
    } catch (err) {
      setError(err.message);
      console.log(err);
      setTimeout(() => setError(null), 3000);
    }
    setIsPending(false);
  };

  return (
    <>
      <AnimatePresence>
        {error && <ErrorModal msg={error} type='error' />}
      </AnimatePresence>
      <main className='main'>
        <div className='login-form'>
          <h2 className='heading-secondary ma-bt-lg'>Log into your account</h2>
          <form className='form' onSubmit={handleSubmit}>
            <div className='form__group'>
              <label className='form__label' htmlFor='email'>
                Email address
              </label>
              <input
                className='form__input'
                id='email'
                type='email'
                placeholder='you@example.com'
                required='required'
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>
            <div className='form__group ma-bt-md'>
              <label className='form__label' htmlFor='password'>
                Password
              </label>
              <input
                className='form__input'
                id='password'
                type={passwordVisibility ? "text" : "password"}
                placeholder='••••••••'
                required='required'
                minLength='8'
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <PasswordEye
                handleClick={() => setPasswordVisibility((prevS) => !prevS)}
                passwordVisibility={passwordVisibility}
              />
            </div>
            <div className='form__group'>
              {!isPending && <button className='btn btn--green'>Login</button>}
              {isPending && (
                <button className='btn btn--green' disabled>
                  Login in...
                </button>
              )}
            </div>
          </form>
        </div>
      </main>
    </>
  );
}
export default Login;
