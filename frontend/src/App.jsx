import { useEffect, useState } from "react";
import AppRoutes from "./routes/AppRoutes";

const ADMIN_TOKEN_KEY = "adminToken";

function App() {
  const [adminToken, setAdminToken] = useState(null);

  useEffect(() => {
    const storedToken = window.localStorage.getItem(ADMIN_TOKEN_KEY);
    if (storedToken) {
      setAdminToken(storedToken);
    }
  }, []);

  const handleLogin = (token) => {
    window.localStorage.setItem(ADMIN_TOKEN_KEY, token);
    setAdminToken(token);
  };

  const handleLogout = () => {
    window.localStorage.removeItem(ADMIN_TOKEN_KEY);
    setAdminToken(null);
  };

  return <AppRoutes adminToken={adminToken} onLogin={handleLogin} onLogout={handleLogout} />;
}

export default App;