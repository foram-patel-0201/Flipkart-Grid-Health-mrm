import logo from "./logo.svg";
import "./App.css";
import { HealthMrmProvider } from "./context/healthmrmContext";
import Navbar from "./components/Navbar/Navbar";
function App() {
  return (
    <HealthMrmProvider>
      <div className="App">
        <Navbar />
      </div>
      ;
    </HealthMrmProvider>
  );
}

export default App;
