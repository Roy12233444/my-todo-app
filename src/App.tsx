import React, { ReactNode } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import SignUp from './components/Auth/SignUp';
import SignIn from './components/Auth/SignIn';
import TodoList from './components/Todo/TodoList';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Routes>
            <Route path="/" element={
              <HomeRedirect />
            } />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/todos" element={
              <PrivateRoute>
                  <TodoList />
              </PrivateRoute>
            } />
          </Routes>
      </Router>
    </AuthProvider>
  )
}

function PrivateRoute({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  return user ? children : <Navigate to="/SignIn" replace />;
}

function HomeRedirect() {
  const { user } = useAuth();
  return user ? <Navigate to="/todos" replace /> : <Navigate to="/SignIn" replace />;
}

export default App;