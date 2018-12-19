import { RouterModule } from '@angular/router';

// Components
import { UsersComponent } from './users.component';
import { UserFormComponent } from './user-form.component';

export const routing = RouterModule.forRoot([
  { path: '', component: UsersComponent },
  { path: 'add', component: UserFormComponent },
])