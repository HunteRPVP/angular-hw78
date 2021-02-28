import { ChangeDetectorRef, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { ɵEmptyOutletComponent } from '@angular/router';

import * as lessons from '../../assets/lessons.json';
import * as ratings from '../../assets/ratings.json';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit, OnChanges {

  journalForm: FormGroup;

  @Input()
  deleteIndex: number;

  @Input()
  deleteLessonIndex: number;

  @Output()
  delete: EventEmitter<number> = new EventEmitter();

  @Input()
  changeArr;

  @Input()
  changeFieldArr;

  @Input()
  addFIO: string;

  @Input()
  addLessonArr: string;

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

  ngOnChanges(): void {
    if (this.deleteIndex != undefined) {
      this.fios.removeAt(this.deleteIndex);
      this.ratings.removeAt(this.deleteIndex);
      this.avgRounds.removeAt(this.deleteIndex);
      this.avgRoundInts.removeAt(this.deleteIndex);
      this.deleteIndex = undefined;
      this.delete.emit();
    }
    else if (this.changeArr != undefined && this.changeArr[1]) {
      this.fios.controls[this.changeArr[0]].setValue(this.changeArr[1]);
      this.changeArr = undefined;
    }
    else if (this.addFIO != undefined) {
      this.fios.push(this.fb.control(this.addFIO));
      this.ratings.push(this.fb.control(
        {
          "fio": this.addFIO,
          "ratings": []
        }
      ));
      for (var i = 0; i < this.ratings.controls[0].value.ratings.length; i++) {
        console.log(this.ratings.controls);
        this.ratings.controls[this.ratings.controls.length - 1].value.ratings.push( 
          {
            "lesson_num": i + 1,
            "rating": 1
          } 
        );
      }
      this.avgRounds.push(this.fb.control(this.AvgRound(i)));
      this.avgRoundInts.push(this.fb.control(this.AvgRoundInt(i)));
      this.addFIO = undefined;
    }
    else if (this.addLessonArr != undefined) {
      console.log(this.lessonNumbers.controls.length);
      this.lessonNumbers.push(this.fb.control(this.lessonNumbers.controls.length + 1));
      this.lessonDates.push(this.fb.control(this.addLessonArr[0]));
      this.lessonThemes.push(this.fb.control(this.addLessonArr[1]));
      for (var i = 0; i < this.ratings.controls.length; i++) {
        this.ratings.controls[i].value.ratings.push( 
          {
            "lesson_num": this.lessonNumbers.controls.length + 1,
            "rating": 1
          } 
        );
        this.avgRounds.value[i] = this.AvgRound(i);
        this.avgRoundInts.value[i] = this.AvgRoundInt(i);
      }
      this.addLessonArr = undefined;
    }
    else if (this.deleteLessonIndex != undefined) {
      this.lessonNumbers.removeAt(this.deleteLessonIndex);
      this.lessonDates.removeAt(this.deleteLessonIndex);
      this.lessonThemes.removeAt(this.deleteLessonIndex);
      for (var i = 0; i < this.ratings.controls.length; i++) {
        this.ratings.controls[i].value.ratings.splice(this.deleteLessonIndex, 1);
        this.avgRounds.value[i] = this.AvgRound(i);
        this.avgRoundInts.value[i] = this.AvgRoundInt(i);
      }
      this.deleteLessonIndex = undefined;
      this.delete.emit();
    }
    else if (this.changeFieldArr != undefined) {
      if(this.changeFieldArr[0] == "date") {
        this.lessonDates.controls[this.changeFieldArr[1]].setValue(this.changeFieldArr[2]);
      }
      else if (this.changeFieldArr[0] == "theme") {
        this.lessonThemes.controls[this.changeFieldArr[1]].setValue(this.changeFieldArr[2]);
      }
    }
  }

  AvgRound(index: number): number {
    var ratingsTemp = [];
    if ( this.journalForm == undefined ) {
      for (var i = 0; i < ratings.students[index].ratings.length; i++) {
        ratingsTemp.push(ratings.students[index].ratings[i].rating);
      }
    }
    else {
      for (var i = 0; i < this.ratings.controls[index].value.ratings.length; i++) {
        ratingsTemp.push(this.ratings.controls[index].value.ratings[i].rating);
      }
    }
    return Math.round((ratingsTemp.reduce((a,b) => a + b, 0) / ratingsTemp.length) * 100) / 100;
  }

  AvgRoundInt(index: number): number {
    var ratingsTemp = [];
    if ( this.journalForm == undefined ) {
      for (var i = 0; i < ratings.students[index].ratings.length; i++) {
        ratingsTemp.push(ratings.students[index].ratings[i].rating);
      }
    }
    else {
      for (var i = 0; i < this.ratings.controls[index].value.ratings.length; i++) {
        ratingsTemp.push(this.ratings.controls[index].value.ratings[i].rating);
      }
    }
    return Math.round(ratingsTemp.reduce((a,b) => a + b, 0) / ratingsTemp.length);
  }

  changeRating(i: number, j: number, changedRating: string): void {
    this.ratings.controls[i].value.ratings[j].rating = parseInt(changedRating);
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
