import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-trainings',
  templateUrl: './past-trainings.component.html',
  styleUrls: ['./past-trainings.component.css']
})
export class PastTrainingsComponent implements OnInit, AfterViewInit {
  tableData = new MatTableDataSource<Exercise>();
  displayedColumns = ['date', 'name', 'calories', 'duration', 'state'];

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private trainingService: TrainingService) { }

  ngOnInit() {
    this.tableData.data = this.trainingService.getExercisesHistory();
  }

  ngAfterViewInit() {
    this.tableData.sort = this.sort;
    this.tableData.paginator = this.paginator;
  }
}
