import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as ratings from '../../assets/ratings.json';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {

  studentForm: FormGroup;

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  @Output()
  delete: EventEmitter<number> = new EventEmitter();

  @Output()
  add: EventEmitter<string> = new EventEmitter();

  fioArray: string[] = [];

  constructor(private fb: FormBuilder) {
    for (var i = 0; i < ratings.students.length; i++) {
      this.fioArray.push(ratings.students[i].fio);
    }

    this.studentForm = fb.group({ 
      students: fb.array(this.fioArray)
    });

    for (var i = 0; i < ratings.students.length; i++) {
      this.students.controls[i].setValidators([Validators.required]);
    }
  }

  ngOnInit(): void {
  }

  get students(): FormArray {
    return this.studentForm.get('students') as FormArray;
  }

  deleteStudent(i: number): void {
    this.students.removeAt(i);
    this.delete.emit(i);
  }

  addStudent(): void {
    this.students.push(this.fb.control('', Validators.required));
    this.add.emit('');
  }

  changeEmit(i: number) {
    this.change.emit([i, this.students.controls[i.toString()].value]);
  }

}
