import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import * as lessons from '../../assets/lessons.json';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  lessonForm: FormGroup;

  numberArr: number[] = [];
  dateArr: Date[] = [];
  themeArr: string[] = [];
  homeworkArr: string[] = [];
  noteArr: string[] = [];

  constructor(private fb: FormBuilder) { 

    for (var i = 0; i < lessons.lessons.length; i++) {
      this.numberArr.push(lessons.lessons[i].number);
      this.dateArr.push(new Date (lessons.lessons[i].date));
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
    for(var j = this.numbers.length - 1; j >= i; j--) {
      this.numbers.get(j.toString()).setValue(j + 1);
    }
  }

  addLesson(date: string, theme: string, hw: string, note: string): void {
    date = date + 'T09:00:00';
    this.numbers.push(this.fb.control([this.numbers.length + 1]));
    this.dates.push(this.fb.control([date]));
    this.themes.push(this.fb.control([theme]));
    this.homeworks.push(this.fb.control([hw]));
    this.notes.push(this.fb.control([note]));
  }

}
