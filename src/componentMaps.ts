import { lazy, LazyExoticComponent, ComponentType } from 'react';

const menuComponents: Record<string, LazyExoticComponent<ComponentType<any>>> = {
  "./pages/demo/index.jsx": lazy(() => import('./pages/demo/index')),
  "./pages/category/CategoryPage.tsx": lazy(() => import('./pages/category/CategoryPage')),
};

export default menuComponents;
