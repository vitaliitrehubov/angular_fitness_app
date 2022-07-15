import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styles: [`.new-training { padding: 30px; }`]
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  isLoading = true;
  exercises: Exercise[];
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  onStartTraining(id: string) {
    this.trainingService.startExercise(id);
  }

  ngOnInit() {
    this.exerciseSubscription = this.trainingService.exercisesChanged
      .subscribe((exercises) => {
        this.exercises = exercises;
        this.isLoading = false;
    });

    this.trainingService.fetchAvailableExercises();
  }

  ngOnDestroy() {
    this.exerciseSubscription.unsubscribe();
  }
}
