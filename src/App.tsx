import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/global/header";
import Home from "@/components/home/home";
import About from "@/components/about/about";
import CreatePost from "@/components/home/create";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./components/global/footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/create" element={<CreatePost />} />
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
