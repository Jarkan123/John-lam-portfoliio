
import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CMSProvider } from './context/CMSContext';
import { AuthProvider } from './context/AuthContext';
import HomePage from './pages/HomePage';
import CaseStudiesPage from './pages/CaseStudiesPage';
import CaseStudyDetailPage from './pages/CaseStudyDetailPage';
import ContactPage from './pages/ContactPage';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboard from './pages/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import SiteLayout from './components/SiteLayout';
import Preloader from './components/Preloader';

const App: React.FC = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Set a minimum time for the preloader animation to feel substantial.
    const timer = setTimeout(() => setLoading(false), 5000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader loading={loading} />
      <div className={`transition-opacity duration-500 ${loading ? 'opacity-0' : 'opacity-100'}`}>
        <CMSProvider>
          <AuthProvider>
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
