import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { dispatch } = useAuthContext();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:3000/api/v1/users/login", {
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

      if (data.status === 'fail') throw data.error
      
      localStorage.setItem("jwt", data.token);
      dispatch({ type: "LOGIN", payload: data.data.user, token: data.token });

      navigate('/')
    } catch (err) {
      console.log(err);
    }
  };

  return (
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
              type='password'
              placeholder='••••••••'
              required='required'
              minLength='8'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            />
          </div>
          <div className='form__group'>
            <button className='btn btn--green'>Login</button>
          </div>
        </form>
      </div>
    </main>
  );
}
export default Login;
