import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from './exercise.model';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.css']
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
    if(this.exerciseSubscription) {
      this.exerciseSubscription.unsubscribe();
    }
  }
}
