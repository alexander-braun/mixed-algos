import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { GridOptionsService } from '../grid-options.service';

@Component({
  selector: 'app-grid-options',
  templateUrl: './grid-options.component.html',
  styleUrls: ['./grid-options.component.scss'],
})
export class GridOptionsComponent implements OnInit {
  x!: number;
  y!: number;

  optionsForm = this.fb.group({
    x: [''],
    y: [''],
  });

  constructor(
    private gridOptionsService: GridOptionsService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.optionsForm.patchValue({
      x: this.gridOptionsService.x.value,
      y: this.gridOptionsService.y.value,
    });
  }

  onChange() {
    this.gridOptionsService.x.next(this.optionsForm.get('x')?.value);
    this.gridOptionsService.y.next(this.optionsForm.get('y')?.value);
  }
}
