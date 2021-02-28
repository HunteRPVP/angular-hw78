import { ThrowStmt } from '@angular/compiler';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-hw78';

  changeArr;
  changeFieldArr;
  deleteIndex: number;
  deleteLessonIndex: number;
  addFIO: string;
  addLessonArr: string;

  changeFIO(changeArr: any): void {
    this.changeArr = changeArr;
  }

  changeField(changeFieldArr: any): void {
    this.changeFieldArr = changeFieldArr;
  }

  deleteStudent(i: number): void {
    this.deleteIndex = i;
  }

  deleteLesson(i: number): void {
    this.deleteLessonIndex = i;
  }

  addStudent(fio: string): void {
    this.addFIO = fio;
  }

  addLesson(addLessonArr: any): void {
    this.addLessonArr = addLessonArr;
  }

  returnToDefault(): void {
    setTimeout(() => this.deleteIndex = undefined);
    setTimeout(() => this.deleteLessonIndex = undefined);
  }
}
