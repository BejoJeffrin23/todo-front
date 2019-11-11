import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoService } from '../../todo.service';
import {ToastrService} from 'ngx-toastr'


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  public p: Number = 1;
public count: Number = 5;
public userId:any;
public event
public events;

  constructor(public _route: ActivatedRoute, public router: Router, public service: TodoService, public toastr:ToastrService) { }

  ngOnInit() {

    this.userId = this._route.snapshot.paramMap.get('userId');
    this.fetch()
  }

  addEvent(){
    this.router.navigate([`/create` ])

  }

  deleteEvent(eventId) {
    console.log(eventId)
    this.service.delete(eventId).subscribe(data=>{
      this.toastr.success('Event deleted', 'Success');
      this.fetch()
    })
      }

      fetch=()=>{
        this.service.getevents(this.userId).subscribe(data => {
        this.events=data.data
        console.log(this.events)
        })
      }

}
