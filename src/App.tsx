import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/layout/header";
import Home from "@/pages/home/home";
import About from "@/pages/about/about";
import { Toaster } from "@/components/ui/sonner";
import Footer from "./layout/footer";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Toaster />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
