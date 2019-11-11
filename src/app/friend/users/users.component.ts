import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';
import { Cookie } from 'ng2-cookies/ng2-cookies';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  userId: any;
  data: any;
  id: any;
  userIdinuser: string;
  datas: Object;
  ids: any;
  firstName: any;
  lastName: any;
  receiverId: any;
  realmsg: any;
  userName:any;

 

  constructor(public service:TodoService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketService) { 
    
  }

  ngOnInit() {
    this.getusers();
    this.userName=Cookie.get('userName')
    this.userId= this._route.snapshot.paramMap.get('userId')
  }
  
  public getusers=()=>{
    this.service.getusers().subscribe(
      data=>{
        this.data=data.data;
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
  }
 
  public sendrequest=(receiverId,firstName,lastName)=>{
      let options={
        senderId:this.userId,
        receiverId:receiverId,
        senderName:this.userName,
        recieverfirstName:firstName,
        recieverlastName :lastName
      }
      this.service.sendrequest(options).subscribe(
        data=>{
          console.log(data)
          if(data.error===true){
              this.toastr.error(data.message)
          }
          else {
            this.toastr.success(data.message);
           data.data.message=`${data.data.senderName} send friend request`;
           this.socketService.sendfriendrequest();
           this.getreq();
          }
        },
        err=>{
          this.toastr.error('some error occured')
        }
      )
  }
  public getreq=()=>{
    this.socketService.getfriendrequest().subscribe(
      data=>{
        this.toastr.success(data.message)
      },
      err=>{
        this.toastr.error('some error occured')
      }
    )
 }
}
