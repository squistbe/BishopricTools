import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { RolesGuard } from './guards/roles.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: './pages/login/login.module#LoginPageModule'
  },
  {
    path: 'home',
    loadChildren: './pages/home/home.module#HomePageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true,
        guest: true
      }
    }
  },
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
    path: 'conducting',
    loadChildren: './pages/conducting/conducting.module#ConductingPageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'access-denied',
    loadChildren: './pages/access-denied/access-denied.module#AccessDeniedPageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'privacy-policy',
    loadChildren: './pages/privacy-policy/privacy-policy.module#PrivacyPolicyPageModule'
  },
  {
    path: 'profile',
    loadChildren: './pages/profile/profile.module#ProfilePageModule',
    canActivate: [AuthGuard]
  },
  {
    path: 'agenda',
    loadChildren: './pages/agenda/agenda.module#AgendaPageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'announcements',
    loadChildren: './pages/announcements/announcements.module#AnnouncementsPageModule'
  },
  {
    path: 'support',
    loadChildren: './pages/support/support.module#SupportPageModule'
  },
  {
    path: 'users',
    loadChildren: './pages/users/users.module#UsersPageModule',
    canActivate: [AuthGuard, RolesGuard],
    data: {
      expectedRoles: {
        admin: true
      }
    }
  },
  {
    path: 'reimbursement',
    loadChildren: './pages/reimbursement/reimbursement.module#ReimbursementPageModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
