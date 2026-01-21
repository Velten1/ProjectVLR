import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  DashboardPage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  ResetPasswordPage,
  GuessAgentPage,
  GuessQuotePage,
} from './pages';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/guess-agent" element={<GuessAgentPage />} />
          <Route path="/guess-quote" element={<GuessQuotePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
