import { Injectable } from "@angular/core";
import { Subscription, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Exercise } from "./exercise.model";

@Injectable({ providedIn: 'root' })
export class TrainingService {
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  private dbSubs: Subscription[] = [];
  private availableExercises: Exercise[] = [];
  private ongoingExercise: Exercise;

  constructor(private db: AngularFirestore) { }

  fetchExercisesHistory() {
    this.dbSubs.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe((exercises: Exercise[]) => {
          this.finishedExercisesChanged.next(exercises);
        })
    );
  }

  fetchAvailableExercises() {
    this.dbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(map((docArray) =>
          docArray.map((doc) => ({
            id: doc.payload.doc.id,
            name: doc.payload.doc.data()['name'],
            duration: doc.payload.doc.data()['duration'],
            calories: doc.payload.doc.data()['calories']
          }))
        ))
        .subscribe((exercises: Exercise[]) => {
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        })
    );
  }

  addDataToDb(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
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
    this.addDataToDb({
      ...this.ongoingExercise,
      date: new Date().toDateString(),
      state: 'completed'
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    const duration = +(this.ongoingExercise.duration * (progress / 100)).toFixed();
    const calories = +(this.ongoingExercise.calories * (progress / 100)).toFixed();

    this.addDataToDb({
      ...this.ongoingExercise,
      date: new Date().toDateString(),
      duration,
      calories,
      state: 'cancelled'
    });

    this.ongoingExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelSubscriptions() {
    this.dbSubs.forEach((subsription) => subsription.unsubscribe());
  }
}
