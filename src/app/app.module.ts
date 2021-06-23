import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GridComponent } from './grid/grid.component';
import { GridOptionsComponent } from './grid-options/grid-options.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaintObstacleDirective } from './shared/directives/paint-obstacle.directive';

@NgModule({
  declarations: [
    AppComponent,
    GridComponent,
    GridOptionsComponent,
    PaintObstacleDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
