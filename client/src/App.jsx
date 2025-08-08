import { Route, Routes } from "react-router-dom";
import { SpinSlotPage } from "./pages/SpinSlotPage/SpinSlotPage";
import { Header } from "./components/Header/Header";
import "./App.scss";
import { AppProvider } from "./context/AppContext";
import { RegistationPage } from "./pages/RegistrationPage";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<SpinSlotPage />} />
          <Route path="/registration" element={<RegistationPage />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
