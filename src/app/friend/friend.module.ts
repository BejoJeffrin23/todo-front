import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users/users.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FriendListComponent } from './friend-list/friend-list.component';
import { FriendRequestComponent } from './friend-request/friend-request.component';



@NgModule({
  declarations: [UsersComponent, FriendListComponent, FriendRequestComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild ([
      {path:"users/:userId",component:UsersComponent},
      {path:"request/:userId",component:FriendRequestComponent},
      {path:"friends/:userId",component:FriendListComponent}
    ])
  ]
})
export class FriendModule { }
