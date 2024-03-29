import Login from "./components/Login/Login";
import Home from "./components/Home/Home";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/home' element={<Home />}></Route>
      </Routes>
  );
}

export default App;
