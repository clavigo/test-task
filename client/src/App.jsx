import { Route, Routes } from "react-router-dom";
import { SpinSlotPage } from "./pages/SpinSlotPage/SpinSlotPage";
import { Header } from "./components/Header/Header";
import "./App.scss";
import { AppProvider } from "./context/AppContext";
import { RegistationPage } from "./pages/RegistrationPage";
import { LoginPage } from "./pages/LoginPage";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<SpinSlotPage />} />
          <Route path="/registration" element={<RegistationPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
