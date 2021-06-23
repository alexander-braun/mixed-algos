import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ObstaclePaintService {
  paintMode = new BehaviorSubject<boolean>(false);
  obstacles = new BehaviorSubject<number[]>([]);

  constructor() {}

  addObstacle(obstacle: number): void {
    const current = this.obstacles.value;
    const exists = current.indexOf(obstacle) >= 0;
    if (!exists) {
      current.push(obstacle);
      this.obstacles.next(current);
    }
  }

  removeObstacle(obstacle: number): void {
    const current = this.obstacles.value;
    const exists = current.indexOf(obstacle) >= 0;
    if (exists) {
      current.splice(current.indexOf(obstacle), 1);
    }
  }

  isObstacle(obstacle: number): boolean {
    return this.obstacles.value.indexOf(obstacle) >= 0;
  }
}
