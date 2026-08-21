import { Routes } from '@angular/router';

import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { Spaces } from './pages/spaces/spaces';
import { SpaceDetails } from './pages/space-details/space-details';
import { Dashboard } from './pages/dashboard/dashboard';
import { Bookings } from './pages/bookings/bookings';
import { MyBookings } from './pages/my-bookings/my-bookings';
import { Profile } from './pages/profile/profile';
import { AdminDashboard } from './pages/admin-dashboard/admin-dashboard';

import { authGuard } from './guards/auth-guard';


export const routes: Routes = [

  // =========================
  // PUBLIC ROUTES
  // =========================

  {
    path: '',
    component: Home
  },

  {
    path: 'login',
    component: Login
  },

  {
    path: 'register',
    component: Register
  },

  {
    path: 'spaces',
    component: Spaces
  },

  {
    path: 'spaces/:id',
    component: SpaceDetails
  },


  // =========================
  // PROTECTED ROUTES
  // =========================

  {
    path: 'dashboard',
    component: Dashboard,
    canActivate: [authGuard]
  },

  {
    path: 'bookings',
    component: Bookings,
    canActivate: [authGuard]
  },

  {
    path: 'my-bookings',
    component: MyBookings,
    canActivate: [authGuard]
  },

  {
    path: 'profile',
    component: Profile,
    canActivate: [authGuard]
  },

  {
    path: 'admin',
    component: AdminDashboard,
    canActivate: [authGuard]
  },


  // =========================
  // FALLBACK
  // =========================

  {
    path: '**',
    redirectTo: ''
  }

];