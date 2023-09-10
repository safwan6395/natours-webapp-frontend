import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import Tour from "./pages/Tour";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import ErrorPage from './pages/ErrorPage'

function App() {
  const { authIsReady, dispatch } = useAuthContext();

  useEffect(() => {
    console.log('it run')
    const getCurrentUser = async (jwt) => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${jwt}`,
          },
        });

        const data = await res.json();

        dispatch({
          type: "AUTH_IS_READY",
          payload: data.data.data,
          token: jwt,
        });
      } catch (err) {
        console.log(err);
      }
    };

    const jwt = localStorage.getItem("jwt");
    
    if (jwt) getCurrentUser(jwt);
    else dispatch({ type: "AUTH_IS_READY" });
  }, [dispatch]);

  return (
    <>
      {authIsReady && (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path='/' exact element={<Overview />} />
            <Route path='/tour/:id' exact element={<Tour />} />
            <Route path='/login' exact element={<Login />} />
            <Route path='/signup' exact element={<Signup />} />

            <Route path='*' element={<ErrorPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
