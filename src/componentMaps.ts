import { lazy } from 'react';

const menuComponents: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {
  "./pages/demo/index.jsx": lazy(() => import('./pages/demo/index')),
  "./pages/UserManagement.tsx": lazy(() => import('./pages/UserManagement')),
  "./pages/CoursePage.tsx": lazy(() => import('./pages/CoursePage')),
};

export default menuComponents;