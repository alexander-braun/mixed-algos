import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { GridOptionsService } from '../shared/services/grid-options.service';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-grid-options',
  templateUrl: './grid-options.component.html',
  styleUrls: ['./grid-options.component.scss'],
})
export class GridOptionsComponent implements OnInit {
  optionsForm = this.fb.group({
    x: [0, [Validators.min(0), Validators.required]],
    y: [0, [Validators.min(0), Validators.required]],
    start: [0, [Validators.required]],
    target: [1, [Validators.required]],
    startOrTarget: ['start'],
    paintObstacles: [false],
  });

  constructor(
    private gridOptionsService: GridOptionsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.optionsForm.patchValue({
      x: this.gridOptionsService.xY.value.x,
      y: this.gridOptionsService.xY.value.y,
      start: this.gridOptionsService.start.value,
      target: this.gridOptionsService.target.value,
      startOrTarget: this.gridOptionsService.startOrTarget.value,
      paintObstacles: this.gridOptionsService.paintObstacles.value,
    });

    combineLatest([
      this.gridOptionsService.start,
      this.gridOptionsService.target,
    ])
      .pipe(
        tap(() => {
          this.optionsForm.patchValue({
            start: this.gridOptionsService.start.value,
          });
          this.optionsForm.patchValue({
            target: this.gridOptionsService.target.value,
          });
        })
      )
      .subscribe();
  }

  onChange(): void {
    this.gridOptionsService.xY.next(this.optionsForm.value);
  }

  onChangeStartOrTarget(): void {
    this.gridOptionsService.startOrTarget.next(
      this.optionsForm.get('startOrTarget')?.value
    );
  }

  onChangeStart(): void {
    this.gridOptionsService.start.next(this.optionsForm.get('start')?.value);
  }

  onChangeTarget(): void {
    this.gridOptionsService.target.next(this.optionsForm.get('target')?.value);
  }

  onChangePaintMode(): void {
    this.gridOptionsService.paintObstacles.next(
      this.optionsForm.get('paintObstacles')?.value
    );
  }
}
