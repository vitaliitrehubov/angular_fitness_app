import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';


@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.css']
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainingExit = new EventEmitter<void>();
  exerciseProgress = 0;
  intervalId: number;
  progressStep = 10;

  constructor(private dialog: MatDialog) { }

  onStop() {
    this.clearTimer();

    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.exerciseProgress
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.trainingExit.emit();
      } else {
        this.startOrResumeTimer();
      }
    });
  }

  clearTimer() {
    clearInterval(this.intervalId);
  }

  startOrResumeTimer() {
    this.intervalId = setInterval(() => {
      this.exerciseProgress += this.progressStep;

      if(this.exerciseProgress >= 100) {
        this.clearTimer();
      }
    }, 1000)
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

}
