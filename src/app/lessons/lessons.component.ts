import { DatePipe } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';

import * as lessons from '../../assets/lessons.json';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [DatePipe]
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

  constructor(private fb: FormBuilder, private datePipe: DatePipe) { 

    for (var i = 0; i < lessons.lessons.length; i++) {
      this.numberArr.push(lessons.lessons[i].number);
      this.dateArr.push(lessons.lessons[i].date);
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
      this.dates.controls[i].setValidators([Validators.required]);
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
    this.dates.push(this.fb.control(this.datePipe.transform(new Date(), 'yyyy-MM-dd'), [Validators.required, CustomValidators.minDate(this.datePipe.transform(new Date(), 'yyyy-MM-dd'))]));
    this.themes.push(this.fb.control('', Validators.required));
    this.homeworks.push(this.fb.control('', Validators.required));
    this.notes.push(this.fb.control('', Validators.required));
    this.add.emit([new Date(), '']);
  }

  changeField(type, i: number, value) {
    this.change.emit([type, i, value]);
  }

}
