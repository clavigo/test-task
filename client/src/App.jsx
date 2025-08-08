import { Route, Routes } from "react-router-dom";
import { SpinSlotPage } from "./pages/SpinSlotPage/SpinSlotPage";
import { Header } from "./components/Header/Header";
import "./App.scss";
import { AppProvider } from "./context/AppContext";

function App() {
  return (
    <AppProvider>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<SpinSlotPage />} />
        </Routes>
      </div>
    </AppProvider>
  );
}

export default App;
