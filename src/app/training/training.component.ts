import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  template: `
    <mat-tab-group *ngIf="!ongoingTraining; else currentTraining">
      <mat-tab label="New Training">
        <app-new-training></app-new-training>
      </mat-tab>
      <mat-tab label="Past Trainings">
        <app-past-trainings></app-past-trainings>
      </mat-tab>
    </mat-tab-group>
    <ng-template #currentTraining>
      <app-current-training></app-current-training>
    </ng-template>
  `
})
export class TrainingComponent implements OnInit, OnDestroy {
  ongoingTraining: Exercise;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exerciseChanged
      .subscribe((exercise) => this.ongoingTraining = exercise);
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
