import { Component, DoCheck, OnInit } from '@angular/core';
//inteface
import { TaskList } from '../../model/task-list';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss']
})
export class TodoListComponent implements DoCheck {

  public taskList: Array <TaskList> = JSON.parse(localStorage.getItem("list") || '[]');

  public deleteItemTaskList(event: number){
    this.taskList.splice(event, 1);
  }

  public deleteAllTaskList (){
    const confirm = window.confirm("Voce deseja realmente deletar tudo?");
    if(confirm){
      this.taskList = [];
    }
  }

  constructor() { }
  
  //ordenar lista e adicionar ao LocalStorage
  ngDoCheck(): void {
    this.setLocalStorage();   
    
  }

  //tratar local storage
  public setLocalStorage(){
    if(this.taskList){
      this.taskList.sort((first, last)=> Number(first.checked) - Number(last.checked));
      localStorage.setItem("list", JSON.stringify(this.taskList));
    }
  }
  public setEmitTaskList (event: string){
    if(event.trim()){
      this.taskList.push({task: event, checked: false});
    }
    
  }

  public validationInput(event: string, index: number){
    if(!event.length){
      const confirm = window.confirm("Task está vazia, deseja deletar?");

      if(confirm){
        this.deleteItemTaskList(index);
      }
    }
  }

}
