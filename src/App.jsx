import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Body from "./Body";
import Login from "./Login";
import Profile from "./Profile";

function App() {
  return (
    <>

      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body/>}>
            <Route path="/login" element={<Login/>}/>
            <Route path="/profile" element={<Profile/>}/>
          </Route>
          
        </Routes>
      </BrowserRouter>


      {/* <Navbar />
      <h1 className="bg-red-600 text-amber-300 text-4xl underline border border-b-emerald-900">
        Hello World !!
      </h1> */}
    </>
  );
}

export default App;
