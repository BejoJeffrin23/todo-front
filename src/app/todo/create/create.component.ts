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
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  public eventId: string;
  public startDate;
  public title: string;
  public adminName;
  public adminId:string;
  public userId: string;
  public start;

  constructor(public toastr: ToastrService, private SocketService: SocketService, private service:TodoService, private _route: ActivatedRoute, private appRouter: Router, private location: Location, private config: NgbDatepickerConfig) {
    //configuring Datepicker
    const currentDate = new Date();

    config.minDate = { year: currentDate.getFullYear(), month: currentDate.getMonth() + 1, day: currentDate.getDate() };
    config.maxDate = { year: currentDate.getFullYear()+5, month: 12, day: 31 };
    config.outsideDays = 'hidden';
  }

  ngOnInit() {
    this.userId = this._route.snapshot.paramMap.get('userId');
    this.adminName = Cookie.get('userName')
    this.adminId=Cookie.get('userId')

  }


  create() {
    this.start = new Date(this.startDate)

    let eventData;

      eventData = {
        startYear: this.startDate.year,
        startMonth:this.startDate.month,
        startDay:this.startDate.day,
        title: this.title,
        adminName: this.adminName,
        adminId: Cookie.get('userId'),
      };
    
    this.service.create(eventData).subscribe((data) => {
      if (data.status == 200) {
        this.SocketService.eventCreated(Cookie.get('userName'), data.data.userId,data.data.title)
        this.toastr.success('Event created successfully')
        this.appRouter.navigate([`${this.adminId}/dash`])
      }
    });
  }

  public logout = () => {

    this.service.logout().subscribe((apiResponse) => {

      if (apiResponse.status === 200) {
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








