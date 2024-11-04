import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "@/components/layout/Header";
import Home from "@/pages/Home";
import About from "@/pages/About";
import { Toaster } from "@/components/ui/sonner";
import Footer from "@/components/layout/Footer";
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
