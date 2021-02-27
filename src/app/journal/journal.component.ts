import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';

import * as lessons from '../../assets/lessons.json';
import * as ratings from '../../assets/ratings.json';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {

  journalForm: FormGroup;

  fioArray: string[] = [];
  lessonNumbersArr: number[] = [];
  lessonDatesArr: Date[] = [];
  lessonThemesArr: string[] = [];
  avgRoundArr: number[] = [];
  avgRoundIntArr: number[] = [];

  constructor(private fb: FormBuilder) {
    for (var i = 0; i < ratings.students.length; i++) {
      this.fioArray.push(ratings.students[i].fio);
      this.lessonNumbersArr.push(lessons.lessons[i].number);
      this.lessonDatesArr.push(new Date(lessons.lessons[i].date));
      this.lessonThemesArr.push(lessons.lessons[i].theme);
      this.avgRoundArr.push(this.AvgRound(i));
      this.avgRoundIntArr.push(this.AvgRoundInt(i));
    }

    this.journalForm = fb.group({ 
      fios: fb.array(this.fioArray),
      lessonNumbers: fb.array(this.lessonNumbersArr),
      lessonDates: fb.array(this.lessonDatesArr),
      lessonThemes: fb.array(this.lessonThemesArr),
      ratings: fb.array(ratings.students),
      avgRounds: fb.array(this.avgRoundArr),
      avgRoundInts: fb.array(this.avgRoundIntArr)
    });
  }

  ngOnInit(): void {
  }

  AvgRound(index: number): number {
    var ratingsTemp = [];
    for (var i = 0; i < ratings.students[index].ratings.length; i++) {
      ratingsTemp.push(ratings.students[index].ratings[i].rating);
    }
    return Math.round((ratingsTemp.reduce((a,b) => a + b, 0) / ratingsTemp.length) * 100) / 100;
  }

  AvgRoundInt(index: number): number {
    var ratingsTemp = [];
    for (var i = 0; i < ratings.students[index].ratings.length; i++) {
      ratingsTemp.push(ratings.students[index].ratings[i].rating);
    }
    return Math.round(ratingsTemp.reduce((a,b) => a + b, 0) / ratingsTemp.length);
  }

  changeRating(i: number, j: number, changedRating: string): void {
    ratings.students[i].ratings[j].rating = parseInt(changedRating);
    this.avgRounds.value[i] = this.AvgRound(i);
    this.avgRoundInts.value[i] = this.AvgRoundInt(i);
  }

  get fios(): FormArray {
    return this.journalForm.get('fios') as FormArray;
  }

  get lessonNumbers(): FormArray {
    return this.journalForm.get('lessonNumbers') as FormArray;
  }

  get lessonDates(): FormArray {
    return this.journalForm.get('lessonDates') as FormArray;
  }
  
  get lessonThemes(): FormArray {
    return this.journalForm.get('lessonThemes') as FormArray;
  }

  get ratings(): FormArray {
    return this.journalForm.get('ratings') as FormArray;
  }

  get avgRounds(): FormArray {
    return this.journalForm.get('avgRounds') as FormArray;
  }

  get avgRoundInts(): FormArray {
    return this.journalForm.get('avgRoundInts') as FormArray;
  }

}
