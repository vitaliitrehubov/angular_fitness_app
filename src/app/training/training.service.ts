import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

import { Exercise } from "./exercise.model";

@Injectable({ providedIn: 'root' })
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  private availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 30, calories: 100 },
    { id: 'touch_toes', name: 'Touch toes', duration: 120, calories: 250 },
    { id: 'side_lunges', name: 'Side lunges', duration: 60, calories: 50 },
    { id: 'burpees', name: 'Burpees', duration: 90, calories: 150 },
  ];
  private exercises: Exercise[] = [];
  private ongoingExercise: Exercise;

  getExercisesHistory() {
    return this.exercises.slice();
  }

  getAvailableExercises() {
    return this.availableExercises.slice();
  }

  getOngoingExercise() {
    return { ...this.ongoingExercise };
  }

  startExercise(selectedId: string) {
    this.ongoingExercise = this.availableExercises
      .find(({ id }) => id === selectedId);

    this.exerciseChanged.next({ ...this.ongoingExercise });
  }

  completeExercise() {
    this.exercises.push({
      ...this.ongoingExercise,
      date: new Date(),
      state: 'completed'
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    const duration = this.ongoingExercise.duration * (progress / 100);
    const calories = +(this.ongoingExercise.calories * (progress / 100)).toFixed();
    console.log('CANCELLED! ', calories);

    this.exercises.push({
      ...this.ongoingExercise,
      date: new Date(),
      duration,
      calories,
      state: 'cancelled'
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }
}
