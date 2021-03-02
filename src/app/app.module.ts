import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { LessonsComponent } from './lessons/lessons.component';
import { StudentsComponent } from './students/students.component';
import { JournalComponent } from './journal/journal.component';
import { FamilyNamesPipe } from './journal/family-names.pipe';

@NgModule({
  declarations: [
    AppComponent,
    LessonsComponent,
    StudentsComponent,
    JournalComponent,
    FamilyNamesPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [FamilyNamesPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
