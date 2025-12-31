
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext.tsx';
import { AuthProvider } from './context/AuthContext.tsx';
import { SoundProvider } from './context/SoundContext.tsx';
import HomePage from './pages/HomePage.tsx';
import CaseStudiesPage from './pages/CaseStudiesPage.tsx';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage.tsx';
import ContactPage from './pages/ContactPage.tsx';
import AdminLoginPage from './pages/AdminLoginPage.tsx';
import AdminDashboard from './pages/AdminDashboard.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import SiteLayout from './components/SiteLayout.tsx';
import Preloader from './components/Preloader.tsx';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader loading={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <CMSProvider>
          <AuthProvider>
            <SoundProvider>
              <HashRouter>
                <Routes>
                  <Route path="/admin" element={<AdminLoginPage />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <ProtectedRoute>
                        <AdminDashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/*" element={<MainApp />} />
                </Routes>
              </HashRouter>
            </SoundProvider>
          </AuthProvider>
        </CMSProvider>
      </div>
    </>
  );
};

const MainApp: React.FC = () => {
    return (
        <SiteLayout>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/contact" element={<ContactPage />} />
            </Routes>
        </SiteLayout>
    );
};

export default App;