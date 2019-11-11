import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoListComponent } from './todo-list/todo-list.component';
import { CreateComponent } from './create/create.component';
import { RouterModule } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ToastrModule } from 'ngx-toastr';
import { EditComponent } from './edit/edit.component';




@NgModule({
  declarations: [TodoListComponent, CreateComponent, EditComponent],
  imports: [
    CommonModule,
    NgbModalModule,
    NgxPaginationModule,
    NgbModule,
    FormsModule,
    RouterModule.forChild ([
      {path:'create', component:CreateComponent},
      {path:':userId/dash',component:TodoListComponent},
      {path:':eventId/edit',component:EditComponent}
    ]),
    ToastrModule.forRoot(
      {
        preventDuplicates: true
      }
    ),
  ]
})
export class TodoModule { }
