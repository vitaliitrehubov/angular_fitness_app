import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html'
})
export class PastTrainingsComponent implements OnInit, AfterViewInit, OnDestroy {
  isLoading = true;
  tableData = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];
  fetchExercisesSubscription: Subscription;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.fetchExercisesSubscription = this.trainingService.finishedExercisesChanged
      .subscribe((exercises: Exercise[]) => {
        this.tableData.data = exercises;
        this.isLoading = false;
      });

    this.trainingService.fetchExercisesHistory();
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
  }

  ngOnDestroy() {
    this.fetchExercisesSubscription.unsubscribe();
  }
}
