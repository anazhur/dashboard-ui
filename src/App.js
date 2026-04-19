import "./styles/App.scss";
import Layout from "./layout/Layout";
import { SettingsContext, SettingsProvider } from "./context/SettingsContext";
import { useContext } from "react";

function AppContent() {
  const { theme } = useContext(SettingsContext);

  return (
    <div className={`App theme-${theme}`}>
      <Layout />
    </div>
  );
}

function App() {
  return (
    <SettingsProvider>
      <AppContent />
    </SettingsProvider>
  );
}

export default App;