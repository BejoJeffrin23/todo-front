import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { NgbDatepickerConfig, NgbDateAdapter, NgbDateNativeAdapter } from '@ng-bootstrap/ng-bootstrap';
import { config, Subscription, throwError } from 'rxjs';
import { TodoService } from '../../todo.service';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr'
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { SocketService } from '../../socket.service'

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public startDate;
  public title: string;
  public adminName;
  public adminId:string;
  public eventId: string;
  public start;
  public event;

  constructor(public toastr: ToastrService, private SocketService: SocketService, private service:TodoService, private _route: ActivatedRoute, private appRouter: Router, private location: Location, private config: NgbDatepickerConfig) {
    //configuring Datepicker
    const currentDate = new Date();

    config.minDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    config.maxDate = { year: currentDate.getFullYear()+5, month: 12, day: 31 };
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.eventId = this._route.snapshot.paramMap.get('eventId');
    this.service.getSingleEvent(this.eventId).subscribe(data=>{
      console.log(data.data)
      this.event=data.data;
      this.title=this.event.event;
      this.startDate={year:this.event.startYear,
        day:this.event.startDay,
      month:this.event.startMonth
      }


    })
    this.adminName = Cookie.get('userName')
    this.adminId=Cookie.get('userId')

  }


  edit() {

    let eventData;

      eventData = {
        startYear: this.startDate.year,
        startMonth:this.startDate.month,
        startDay:this.startDate.day,
        event: this.title,
        adminName: this.adminName,
        adminId: Cookie.get('userId'),
        eventId:this.eventId
      };
    
    this.service.edit(eventData).subscribe((data) => {
      if (data.status == 200) {
        this.SocketService.eventCreated(Cookie.get('userName'), data.data.userId,data.data.title)
        this.toastr.success('Event edited successfully')
        this.appRouter.navigate([`${this.adminId}/dash`])
      }
    });
  }

  public logout = () => {

    this.service.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
        this.SocketService.disconnect()
        this.SocketService.exitSocket()
        Cookie.delete('authToken');
        Cookie.delete('userName');
        Cookie.delete('userId')
        this.appRouter.navigate(['/login']);

      } else {
        this.toastr.error(apiResponse.message)
      } // end condition

    }, (err) => {
      this.toastr.error('Internal Server Error occured')

    });

  }
  // end of log-out function

}
