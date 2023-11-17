import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { LoginComponent } from 'app/login/login.component';

export const AdminLayoutRoutes: Routes = [
    { path: 'login',          component: LoginComponent },
    { path: 'noticias',      component: DashboardComponent },
    { path: 'actividades',   component: UserProfileComponent },
    { path: 'servicios',     component: TableListComponent },
    { path: 'eps',     component: TypographyComponent },
    { path: 'encuesta',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'estadisticas',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
];
