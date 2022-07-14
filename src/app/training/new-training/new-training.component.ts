import { Component, OnInit } from '@angular/core';

import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private trainingService: TrainingService) { }

  onStartTraining(id: string) {
    this.trainingService.startExercise(id);
  }

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

}
