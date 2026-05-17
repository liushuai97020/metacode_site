import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import ErrorBoundary from './components/ui/ErrorBoundary';

const HomePage = lazy(() => import('./pages/Home/HomePage'));
const FeaturesPage = lazy(() => import('./pages/Features/FeaturesPage'));
const ArchitecturePage = lazy(() => import('./pages/Architecture/ArchitecturePage'));
const DownloadPage = lazy(() => import('./pages/Download/DownloadPage'));
const ChangelogPage = lazy(() => import('./pages/Changelog/ChangelogPage'));
const AboutPage = lazy(() => import('./pages/About/AboutPage'));

/* 加载占位 */
function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#050510]">
      <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
    </div>
  );
}

/* 路由入口 — ErrorBoundary 包裹防止 Canvas 崩溃导致白屏 */
export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Navbar />
        <Suspense fallback={<Loading />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/architecture" element={<ArchitecturePage />} />
            <Route path="/download" element={<DownloadPage />} />
            <Route path="/changelog" element={<ChangelogPage />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
