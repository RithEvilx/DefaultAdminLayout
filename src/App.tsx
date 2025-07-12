import { useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import { Provider as ChakraProvider } from "@/components/ui/provider";
import { changeLanguage } from "i18next";
import "./i18next";
import Router from "@/router";
import Toaster from "./components/ui/toaster";

function App() {
  useEffect(() => {
    const lng_detect = localStorage.getItem("language");
    if (lng_detect) {
      changeLanguage(lng_detect ?? "en");
    } else {
      localStorage.setItem("language", "en");
      changeLanguage("en");
    }
  }, []);

  return (
    <>
      <ChakraProvider>
        <BrowserRouter>
          <Toaster />
          <Router />
        </BrowserRouter>
      </ChakraProvider>
    </>
  );
}

export default App;
