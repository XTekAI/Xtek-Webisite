import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingHeader from './components/LandingHeader';
import LandingFooter from './components/LandingFooter';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';
import BlogIndex from './pages/BlogIndex';
import BlogPost from './pages/BlogPost';
import SuccessStoriesPage from './components/SuccessStoriesPage';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent: React.FC = () => {
  const { isLandingMode } = useLanguage();
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect /landing path to the subdomain
    if (window.location.pathname === '/landing' || window.location.pathname === '/landing/') {
      window.location.href = 'https://landing.xtekai.com';
      return;
    }

    if (!isLandingMode && window.location.hostname === 'blog.xtekai.com' && window.location.pathname === '/') {
      navigate('/blog', { replace: true });
    }
  }, [isLandingMode, navigate]);

  if (isLandingMode) {
    return (
      <div className="min-h-screen hero-pattern">
        <LandingHeader />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <LandingFooter />
      </div>
    );
  }

  return (
    <div className="min-h-screen hero-pattern">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<BlogIndex />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/stories" element={<SuccessStoriesPage />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
};

function App() {
  return (
    <LanguageProvider>
      <Router>
        <ScrollToTop />
        <AppContent />
      </Router>
    </LanguageProvider>
  );
}

export default App;

