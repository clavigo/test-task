import { Route, Routes } from "react-router-dom";
import { SpinSlotPage } from "./pages/SpinSlotPage/SpinSlotPage";
import { Header } from "./components/Header/Header";
import "./App.scss";

function App() {
  return (
    <div className="App">
      <Header />

      <Routes>
        <Route path="/" element={<SpinSlotPage />} />
      </Routes>
    </div>
  );
}

export default App;
