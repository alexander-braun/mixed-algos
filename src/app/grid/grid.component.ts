import { Component, OnInit } from '@angular/core';
import { GridOptionsService } from '../shared/services/grid-options.service';
import { tap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';
import { ObstaclePaintService } from '../shared/services/obstacle-paint.service';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
})
export class GridComponent implements OnInit {
  grid$ = new BehaviorSubject<number[][]>([]);
  startOrTarget = this.gridOptionsService.startOrTarget.value;

  constructor(
    private gridOptionsService: GridOptionsService,
    private obstaclePaintService: ObstaclePaintService
  ) {}

  ngOnInit(): void {
    this.gridOptionsService.grid
      .pipe(
        tap((value) => {
          this.grid$.next(value);
        })
      )
      .subscribe();

    this.gridOptionsService.startOrTarget
      .pipe(
        tap((value) => {
          this.startOrTarget = value;
        })
      )
      .subscribe();
  }

  gridStyle(): {
    'grid-template-columns': string;
    'grid-template-rows': string;
  } {
    return this.gridOptionsService.gridStyle();
  }

  itemStyle(i: number): { start: boolean; end: boolean } {
    return this.gridOptionsService.itemStyle(i);
  }

  public handleGridItemSelectChange(i: number): void {
    if (
      this.startOrTarget === 'start' &&
      !this.obstaclePaintService.paintMode.value &&
      !this.gridOptionsService.paintObstacles.value
    ) {
      this.gridOptionsService.start.next(i);
    } else if (
      !this.obstaclePaintService.paintMode.value &&
      !this.gridOptionsService.paintObstacles.value
    ) {
      this.gridOptionsService.target.next(i);
    }
  }

  public handleMouseLeave(): void {
    console.log('leave');
    this.obstaclePaintService.paintMode.next(false);
  }
}
