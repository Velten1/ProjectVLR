import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import Footer from "./components/Footer";
import Dashboard from "./components/Dashboard";
import LoginForm from "./components/LoginForm";
import GuessAgent from "./components/GuessAgent";
import ResetPassword from "./components/ResetPassword";
import Profile from "./components/Profile";
import GuessQuote from "./components/GuessQuote";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Routes>
          <Route
            path="/login"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow justify-center">
                  <LoginForm />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/register"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow flex items-center justify-center">
                  <RegisterForm />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/reset-password"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow justify-center">
                  <ResetPassword />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow justify-center">
                  <Dashboard />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/GuessAgent"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow justify-center">
                  <GuessAgent />
                </main>
                <Footer />
              </div>
            }
          />
          <Route
            path="/profile"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow justify-center">
                  <Profile />
                </main>
              </div>
            }
          />
          <Route
            path="/guessquote"
            element={
              <div className="flex flex-col flex-grow">
                <main className="flex-grow justify-center">
                  <GuessQuote/>
                </main>
              </div>
            }
          />          
        </Routes>
      </div>
    </Router>
  );
}

export default App;
