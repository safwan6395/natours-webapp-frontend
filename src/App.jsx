import { BrowserRouter, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Overview from "./pages/Overview";
import Tour from "./pages/Tour";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' exact element={<Overview />} />
          <Route path='/tour/:id' exact element={<Tour />} />
          <Route path='*' element={<h2>Route not exist</h2>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
