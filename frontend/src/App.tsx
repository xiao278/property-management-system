import { Routes, Route, Navigate, BrowserRouter } from 'react-router-dom'
import { RequireAuth } from './components/Auth/RequireAuth';
import { useAuth } from './hooks/useAuth';
import { LoginPage } from './pages/LoginPage/LoginPage';
import { NavBar } from './components/Content/NavBar/NavBar';
import { AuthProvider } from './components/Auth/AuthProvider';
import { loginPageRoute } from './pages/LoginPage/LoginPage';
import { HousingEntryPage, housingEntryPageRoute } from './pages/HousingEntryPage/HousingEntryPage';
import { ListingPage, listingPageRoute } from './pages/ListingPage/ListingPage';
import './App.css';
import { AdminRoutes } from './routes/AdminRoutes';
import { adminPageRoute } from './pages/AdministrationPage/AdministrationPage';

export const mainPageRoute = "/app"

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* pubic routes no auth required */}
          <Route path={`${loginPageRoute}`} element={ <LoginPage /> }/>
          {/* protected routes auth requird */}
          <Route path={`${mainPageRoute}/*`} element={
            <RequireAuth>
              <div className='AppWrapper'>
                <NavBar />
                <Routes>
                  <Route path={`${housingEntryPageRoute}`} element= {
                    <HousingEntryPage />
                  } />
                  <Route path={`${listingPageRoute}`} element= {
                    <ListingPage />
                  } />
                  {AdminRoutes()}
                </Routes>
              </div>
            </RequireAuth>
          } />
          <Route path="*" element={ 
            <Navigate to={isAuthenticated ? `${mainPageRoute}` : `${loginPageRoute}`} replace={true}/>
          } />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
