import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '**',
    renderMode: RenderMode.Prerender
  },
  {
    path: 'dashboard/employees/view/:employeeId',
    renderMode: RenderMode.Client
  },
  {
    path: 'dashboard/employees/edit/:employeeId',
    renderMode: RenderMode.Client
  }
];
