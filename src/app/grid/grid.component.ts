import { Component, OnInit } from '@angular/core';
import { GridOptionsService } from '../grid-options.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  grid: number[][] = [];
  x = 10;
  y = 10;

  start = [0, 0];
  startI!: number;
  end = [9, 9];
  endI!: number;

  constructor(private gridOptionsService: GridOptionsService) {}

  ngOnInit(): void {
    this.gridOptionsService.x
      .pipe(
        tap((value) => {
          this.x = value;
          this.generateGrid();
        })
      )
      .subscribe();

    this.gridOptionsService.y
      .pipe(
        tap((value) => {
          this.y = value;
          this.generateGrid();
        })
      )
      .subscribe();
  }

  generateGrid() {
    this.grid = [];
    for (let i = 0; i < this.x; i++) {
      for (let j = 0; j < this.y; j++) {
        this.grid.push([i, j]);
      }
    }

    this.startI = this.start[0] * this.x + this.start[1];
    this.endI = this.end[0] * this.y + this.end[1];
  }

  gridStyle() {
    return {
      'grid-template-columns': 'repeat(' + this.x + ', 1fr)',
      'grid-template-rows': 'repeat(' + this.y + ', 1fr)',
    };
  }

  itemStyle(i: number) {
    return { start: this.startI === i, end: this.endI === i };
  }
}
