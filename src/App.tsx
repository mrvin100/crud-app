import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/header";
import Home from "./components/home";
import About from "./components/about";
import CreatePost from "./components/create";
import UpdatePost from "./components/update";

function App() {
  return (
    <>
    <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/create" element={<CreatePost />} />
      <Route path="/update/:id" element={<UpdatePost />} />
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
