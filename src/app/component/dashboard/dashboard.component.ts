import { Component } from '@angular/core';
import { Task } from 'src/app/model/task';
import { CurdService } from 'src/app/service/curd.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  taskobj : Task = new Task();
  taskArr : Task[] = [];

  addTaskValue : string = '';
  editTaskValue : string = '';


  constructor(private curdService : CurdService) { }

  ngOnInit(): void{
    this.editTaskValue=''
    this.addTaskValue = '';
    this.taskobj = new Task();
    this.taskArr = [];
    this.getAllTask();
  }
  getAllTask() {
    this.curdService.getAllTask().subscribe(res =>{
      this.taskArr = res;
    },err =>{
      alert("Unable to get list of tasks");
    })
  }

    addTask(){
      this.taskobj.task_name = this.addTaskValue
      this.curdService.addTask(this.taskobj).subscribe(res => {
        this.ngOnInit();
        this.addTaskValue = '';
      }, err => {
        alert(err);
      })
    }

    editTask(){
      this.taskobj.task_name = this.editTaskValue;
      this.curdService.editTask(this.taskobj).subscribe(res =>{
        this.ngOnInit();
      },err =>{
        alert("Failed to  update task")
      })
    }

    deleteTask(etask : Task){
      this.curdService.deleteTask(etask).subscribe(res => {
        this.ngOnInit();
      }, err=>{
        alert("Failed to delete Task")
      });
    }

    call(etask : Task){
      this.taskobj = etask;
      this.addTaskValue = etask.task_name;
    }
 

}
