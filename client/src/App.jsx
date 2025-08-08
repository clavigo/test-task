import { Route, Routes } from "react-router-dom";
import "./App.css";
import { SpinSlotPage } from "./pages/SpinSlotPage/SpinSlotPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<SpinSlotPage />} />
      </Routes>
    </div>
  );
}

export default App;
