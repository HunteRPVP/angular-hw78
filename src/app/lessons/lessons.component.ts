import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import * as lessons from '../../assets/lessons.json';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  minDate = new Date();

  @Output()
  delete: EventEmitter<number> = new EventEmitter();

  @Output()
  change: EventEmitter<any> = new EventEmitter();

  @Output()
  add: EventEmitter<any> = new EventEmitter();

  lessonForm: FormGroup;

  numberArr: number[] = [];
  dateArr: string[] = [];
  themeArr: string[] = [];
  homeworkArr: string[] = [];
  noteArr: string[] = [];

  constructor(private fb: FormBuilder) { 

    for (var i = 0; i < lessons.lessons.length; i++) {
      this.numberArr.push(lessons.lessons[i].number);
      this.dateArr.push(new Date (lessons.lessons[i].date).toString());
      this.themeArr.push(lessons.lessons[i].theme);
      this.homeworkArr.push(lessons.lessons[i].homework);
      this.noteArr.push(lessons.lessons[i].note);
    }

    this.lessonForm = fb.group({ 
      numbers: fb.array(this.numberArr),
      dates: fb.array(this.dateArr),
      themes: fb.array(this.themeArr),
      homeworks: fb.array(this.homeworkArr),
      notes: fb.array(this.noteArr)
    });

    for (var i = 0; i < lessons.lessons.length; i++) {
      this.numbers.controls[i].setValidators([Validators.required, Validators.min(1)]);
      this.dates.controls[i].setValidators(Validators.required);
      this.themes.controls[i].setValidators(Validators.required);
      this.homeworks.controls[i].setValidators(Validators.required);
      this.notes.controls[i].setValidators(Validators.required);
    }

  }

  ngOnInit(): void {
  }

  get numbers(): FormArray {
    return this.lessonForm.get('numbers') as FormArray;
  }

  get dates(): FormArray {
    return this.lessonForm.get('dates') as FormArray;
  }

  get themes(): FormArray {
    return this.lessonForm.get('themes') as FormArray;
  }

  get homeworks(): FormArray {
    return this.lessonForm.get('homeworks') as FormArray;
  }

  get notes(): FormArray {
    return this.lessonForm.get('notes') as FormArray;
  }

  deleteLesson(i: number): void {
    this.numbers.removeAt(i);
    this.dates.removeAt(i);
    this.themes.removeAt(i);
    this.homeworks.removeAt(i);
    this.notes.removeAt(i);
    this.delete.emit(i);
    console.log(this.dates);
  }

  addLesson(): void {
    this.numbers.push(this.fb.control([this.numbers.length + 1], [Validators.required, Validators.min(1)]));
    this.dates.push(this.fb.control(new Date(), [Validators.required, CustomValidators.minDate('2021-03-01')]));
    this.themes.push(this.fb.control('', Validators.required));
    this.homeworks.push(this.fb.control('', Validators.required));
    this.notes.push(this.fb.control('', Validators.required));
    this.add.emit([new Date(), '']);
  }

  changeField(type, i: number, value) {
    this.change.emit([type, i, value]);
  }

}
