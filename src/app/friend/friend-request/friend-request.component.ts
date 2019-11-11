import { Component, OnInit } from '@angular/core';
import { TodoService } from 'src/app/todo.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from 'src/app/socket.service';

@Component({
  selector: 'app-friend-request',
  templateUrl: './friend-request.component.html',
  styleUrls: ['./friend-request.component.css']
})
export class FriendRequestComponent implements OnInit {
  userId: string;
  request: any;
  reqcount: any;

  constructor(public service:TodoService,public toastr: ToastrService,public router:Router,public _route:ActivatedRoute,public socketService:SocketService) {
   
    
   }

  ngOnInit() {
    this.userId=this._route.snapshot.paramMap.get('userId');
    this.getrequest();
    
  }
    public getrequest=()=>{
      this.service.getrequest(this.userId).subscribe(
          data=>{
            console.log(data)
            this.request=data.data;
            if(this.request!=null){
            this.reqcount=this.request.length;}
          },
          err=>{
            this.toastr.error('some error occured')
          }
      )
    }
    public acceptrequest=(friendreqId)=>{
      let option={
        friendreqId:friendreqId
      }
         this.service.acceptrequest(option).subscribe(
           data=>{
             data.data.message=`${data.data.receiverfirstName} ${data.data.receiverlastname} accept your friend request`;
              this.getrequest();
           },
           err=>{
             this.toastr.error('some error occured')
           }
         )
    }
    public deletefrndreq=(friendreqId)=>{
     
      this.service.deletefrnfreq(friendreqId).subscribe(
        data=>{
          this.toastr.success(data.message);
          this.getrequest();
          
        },
        err=>{
          this.toastr.error('some error occured')
        }
      )
    }
}
