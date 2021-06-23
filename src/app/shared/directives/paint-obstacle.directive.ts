import { Directive, ElementRef, Host, HostListener } from '@angular/core';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ObstaclePaintService } from '../services/obstacle-paint.service';
import { GridOptionsService } from '../services/grid-options.service';

@Directive({
  selector: '[appPaintObstacle]',
})
export class PaintObstacleDirective {
  mouseMove = new BehaviorSubject<boolean>(false);
  paintedAlready = new BehaviorSubject<boolean>(false);

  constructor(
    private el: ElementRef,
    private obstaclePaintService: ObstaclePaintService,
    private gridOptionsService: GridOptionsService
  ) {
    combineLatest([this.obstaclePaintService.paintMode, this.mouseMove])
      .pipe(
        tap(() => {
          if (
            this.obstaclePaintService.paintMode.value &&
            this.mouseMove.value &&
            !this.obstaclePaintService.isObstacle(
              Number(this.el.nativeElement.innerHTML)
            ) &&
            !this.paintedAlready.value &&
            this.gridOptionsService.paintObstacles.value
          ) {
            this.paintedAlready.next(true);
            this.obstaclePaintService.addObstacle(
              Number(this.el.nativeElement.innerHTML)
            );
            this.el.nativeElement.style.background = 'black';
          } else if (
            this.obstaclePaintService.paintMode.value &&
            this.obstaclePaintService.isObstacle(
              Number(this.el.nativeElement.innerHTML)
            ) &&
            this.mouseMove.value &&
            !this.paintedAlready.value &&
            this.gridOptionsService.paintObstacles.value
          ) {
            this.paintedAlready.next(true);
            this.obstaclePaintService.removeObstacle(
              Number(this.el.nativeElement.innerHTML)
            );
            this.el.nativeElement.style.background = '#cbcbcb';
          }
        })
      )
      .subscribe();
  }

  @HostListener('mousedown') onMouseDown(): void {
    this.obstaclePaintService.paintMode.next(true);
    this.paintedAlready.next(false);
  }

  @HostListener('mouseup') onMouseUp(): void {
    this.obstaclePaintService.paintMode.next(false);
    this.paintedAlready.next(false);
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.paintedAlready.next(false);
    this.mouseMove.next(false);
  }

  @HostListener('mouseenter') onMouseEnter(): void {
    this.paintedAlready.next(false);
    this.mouseMove.next(true);
  }

  @HostListener('mousemove') onMouseMove(): void {
    if (
      !this.paintedAlready.value &&
      this.obstaclePaintService.paintMode.value
    ) {
      this.paintedAlready.next(true);
    }
    this.mouseMove.next(true);
  }
}
