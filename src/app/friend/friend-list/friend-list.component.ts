import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import {Cookie} from "ng2-cookies/ng2-cookies";
import { SocketService } from 'src/app/socket.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.css']
})
export class FriendListComponent implements OnInit {
  userId: string;
  datas: any;
  data: any;
  fullname: any;
  event: any;
  length: any;
  datalength: void;
  eventlength: any;
  friendsCount: any;
  receiverId: any;
  satausId: any;
  statusId: any;
  getundo: any;

  constructor(public service:TodoService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketService) {
   
   }

  ngOnInit() {
    this.userId=this._route.snapshot.paramMap.get('userId');
    console.log(this.userId)
    this.getfriends();

  }
  public getfriends=()=>{
    this.service.getfriends(this.userId).subscribe(
      data=>{console.log(data)
        this.datas=data.data;
        this.friendsCount=this.datas.length;
  
      }
    )
  }
  public getevent=(receiverId)=>{
    this.service.getevents(receiverId).subscribe(
      data=>{ 
        if(data.data.length>0){
        this.event=data.data; 
        this.length=this.event.length;
      
       for(let name of this.event) {
         this.fullname=`${name.firstName} ${name.lastName}`;
       
       }
      
    }
    else {
      this.toastr.error('No events');
          this.length=0;
    }
      }
      
    )
  }
  public delete=(statusId,receiverId)=>{
    this.statusId=statusId;
    this.service.savehistory(statusId).subscribe(
      data=>{
        
      }
    )
    let option={
      statusId:statusId
    }
    this.service.delete(option).subscribe(
      data=>{
        this.getevent(receiverId);
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
   }

  
   public undo=()=>{
       this.service.undo(this.statusId).subscribe(
         data=>{
           this.getundo=data.data;
           if(this.getundo){
           this.getevent(this.getundo.userId);
           this.toastr.success(data.message)
           }
         },
         err=>{
           this.toastr.error('some error occured')
         }
       )
   }
   public unfriend=(friendId)=>{
 
     let options={
       friendId:friendId
     }
     this.service.unfriend(options).subscribe(
       data=>{
         this.toastr.success(data.message)
         this.getfriends();
       },
       err=>{
         this.toastr.error('some error occured')
       }
     )
   }
  
   public logout = () => {

    this.service.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        Cookie.delete('authToken');
        Cookie.delete('userName');
        Cookie.delete('userId')
        this.router.navigate(['/login']);

      } else {
        this.toastr.error(apiResponse.message)
      } // end condition

    }, (err) => {
      this.toastr.error('Internal Server Error occured')

    });

  }
  // end of log-out function

}

