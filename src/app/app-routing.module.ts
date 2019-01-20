import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

const lastRoute = localStorage.getItem('lastRoute');
const routes: Routes = [
  {
    path: '',
    redirectTo: lastRoute === '/' ? 'members' : lastRoute,
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  // { path: 'home', loadChildren: './pages/home/home.module#HomePageModule', canActivate: [AuthGuard] },
  {
    path: 'members',
    loadChildren: './pages/members/members.module#MembersPageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'sacrament-attendance',
    loadChildren: './pages/sacrament-attendance/sacrament-attendance.module#SacramentAttendancePageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'sacrament-calendar',
    loadChildren: './pages/sacrament-calendar/sacrament-calendar.module#SacramentCalendarPageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true,
        guest: true
      }
    }
  },
  {
    path: 'interview-schedule',
    loadChildren: './pages/interview-schedule/interview-schedule.module#InterviewSchedulePageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'orgs',
    loadChildren: './pages/orgs/orgs.module#OrgsPageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'access-denied',
    loadChildren: './pages/access-denied/access-denied.module#AccessDeniedPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
