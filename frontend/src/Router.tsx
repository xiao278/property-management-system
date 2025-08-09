import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { RequireAuth } from './components/RequireAuth';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NavBar } from './components/NavBar/NavBar';
import { AuthProvider } from './components/AuthProvider';

export const mainPageRoute = "app"

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* pubic routes no auth required */}
          <Route path="/login" element={ <LoginPage /> }/>
          {/* protected routes auth requird */}
          <Route path={`/${mainPageRoute}/*`} element={
            <RequireAuth>
              <NavBar />
            </RequireAuth>
          } />
          <Route path="*" element={ 
            <Navigate to={isAuthenticated ? `/${mainPageRoute}` : "/login"} replace={true}/>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
