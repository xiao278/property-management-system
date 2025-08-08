import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage';
import { DashboardPage } from './pages/DashboardPage';
import { AuthProvider } from './components/AuthProvider';
function App() {
  const { isAuthenticated } = useAuth();

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* pubic routes no auth required */}
          <Route path="/login" element={ <LoginPage /> }/>
          {/* protected routes auth requird */}
          <Route path="/dashboard" element={
            <RequireAuth>
              <DashboardPage />
            </RequireAuth>
          } />
          <Route path="*" element={ 
            <Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace={true}/> 
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
