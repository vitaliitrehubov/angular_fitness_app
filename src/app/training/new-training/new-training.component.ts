import { Component, OnInit, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.css']
})
export class NewTrainingComponent implements OnInit {
  exercises = [
    'jogging',
    'stretching',
    'crunches'
  ];
  @Output() startTraining = new EventEmitter<void>();

  constructor() { }

  onStartTraining() {
    this.startTraining.emit();
  }

  ngOnInit(): void {
  }

}
