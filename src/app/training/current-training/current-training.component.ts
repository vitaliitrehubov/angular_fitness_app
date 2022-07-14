import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { StopTrainingComponent } from './stop-training.component';
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  exercise: Exercise;
  progress = 0;
  intervalId: number;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  onStop() {
    this.clearTimer();

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
        exercise: this.exercise
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  startOrResumeTimer() {
    const step = this.exercise.duration / 100 * 1000;

    this.intervalId = setInterval(() => {
      this.progress += 1;

      if(this.progress >= 100) {
        this.trainingService.completeExercise();
        this.clearTimer();
      }
    }, step)
  }

  ngOnInit() {
    this.exercise = this.trainingService.getOngoingExercise();
    console.log('exercise: ', this.exercise);
    this.startOrResumeTimer();
  }

}
