import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
import { startWith, takeUntil, tap } from 'rxjs/operators';
import { GridStyle, ItemStyle } from '../../grid-options.model';

@Injectable({
  providedIn: 'root',
})
export class GridOptionsService implements OnDestroy {
  grid = new BehaviorSubject<number[][]>([]);
  start = new BehaviorSubject<number>(0);
  target = new BehaviorSubject<number>(1);
  xY = new BehaviorSubject({ x: 10, y: 10 });
  startOrTarget = new BehaviorSubject<'start' | 'target'>('start');
  destroy$ = new Subject();
  paintObstacles = new BehaviorSubject<boolean>(false);

  constructor() {
    this.updateGridOnChanges().subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateGridOnChanges(): Observable<any> {
    return combineLatest([
      this.start,
      this.target,
      this.xY,
      this.startOrTarget,
    ]).pipe(
      startWith(null),
      tap(() => {
        this.generateGrid();
      }),
      takeUntil(this.destroy$)
    );
  }

  private generateGrid(): void {
    const g = [];
    for (let i = 0; i < this.xY.value.x; i++) {
      for (let j = 0; j < this.xY.value.y; j++) {
        g.push([i, j]);
      }
    }
    this.grid.next(g);
  }

  public gridStyle(): GridStyle {
    return {
      'grid-template-columns': 'repeat(' + this.xY.value.x + ', 1fr)',
      'grid-template-rows': 'repeat(' + this.xY.value.y + ', 1fr)',
    };
  }

  public itemStyle(i: number): ItemStyle {
    return { start: this.start.value === i, end: this.target.value === i };
  }
}
