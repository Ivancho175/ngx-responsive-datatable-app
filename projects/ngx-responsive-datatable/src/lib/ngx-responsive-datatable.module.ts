import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgxResponsiveDatatableComponent } from './ngx-responsive-datatable.component';

import { SearchBoxPipe } from './search-box.pipe';
import { CountBoxPipe } from './count-box.pipe';

@NgModule({
  declarations: [NgxResponsiveDatatableComponent, SearchBoxPipe, CountBoxPipe],
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  exports: [NgxResponsiveDatatableComponent, SearchBoxPipe, CountBoxPipe],
})
export class NgxResponsiveDatatableModule {}
