import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'ngx-responsive-datatable',
  templateUrl: './ngx-responsive-datatable.component.html',
  styleUrls: ['./ngx-responsive-datatable.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NgxResponsiveDatatableComponent
  implements OnChanges, AfterViewInit
{
  @Input('dataTable') data: any;

  public innerWidth?: number;
  public grid?: HTMLElement | null;
  private initialGridWidth?: number;
  public mainContentWidth?: number;
  public columnRes: string[] = [];
  public limit: number = 10;
  public offset: number = 0;
  public paginationArray: number[] = [];
  private rowHeight?: number;

  private order?: Order;

  public inputBox: FormControl;
  public countBox: FormControl;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    this.mainContentWidth = document.querySelector('body')?.clientWidth;
    if (this.grid) {
      const gridWidth = this.grid.clientWidth;
      const titlesWidth = 150 * this.data?.titles.length;
      const titlesWidthLength = this.data?.titles.length;

      if (titlesWidth > gridWidth) {
        const dif = titlesWidthLength * 150 - gridWidth;
        const residue = Math.ceil(dif / 150);
        if (residue >= 1) {
          const newColumn = this.data.titles.pop();
          this.columnRes = [newColumn, ...this.columnRes];
          this.ref.markForCheck();
        }
      } else {
        const space = gridWidth - titlesWidth;
        const residue = Math.floor(space / 150);
        if (residue >= 1 && this.columnRes.length) {
          const newColumn = this.columnRes.shift();
          this.data.titles.push(newColumn);
          this.ref.markForCheck();
        }
      }
    }
  }

  constructor(private ref: ChangeDetectorRef) {
    this.inputBox = new FormControl('');
    this.countBox = new FormControl(10);
    this.countBox.valueChanges.subscribe((value) => {
      this.limit = value;
      this.offset = 0;
      this.inputBox.reset();
      this.setPagination();
      this.ref.markForCheck();
    });
  }

  ngAfterViewInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      if (this.data && this.data.rows.length) {
        this.setPagination();
        this.rowHeight = document.querySelector('.description')?.clientHeight;
      }
      this.grid = document.querySelector('.responsive-table__grid');
      this.ref.markForCheck();
      if (this.grid) {
        this.initialGridWidth = this.grid?.offsetWidth;
        if (this.initialGridWidth) {
          const theresADif =
            150 * this.data?.titles.length > this.initialGridWidth;
          if (theresADif) {
            const dif = this.initialGridWidth - 150 * this.data?.titles.length;
            const residue = Math.floor(dif / 150);
            this.columnRes =
              residue >= 1 ? null : this.data.titles.splice(residue);
            this.ref.markForCheck();
          }
        }
      }
    }
  }

  public getStyles() {
    return {
      display: 'grid',
      'grid-template-columns': `repeat(${this.data?.titles.length}, 1fr)`,
      gap: '0.5rem',
      'justify-items': 'center',
      'align-items': 'center',
    };
  }

  public getGridTemplate() {
    return {
      'grid-column': `1 / ${this.data?.titles.length + 1}`,
      display: 'grid',
      'grid-template-columns': `repeat(${this.data?.titles.length}, 1fr)`,
      'justify-items': 'center',
      'min-width': '100%',
    };
  }

  public getPanelWidth() {
    return {
      'grid-column': `1 / ${this.data?.titles.length + 1}`,
    };
  }

  getValue(row: any, column: any) {
    const value = parseInt(column);
    return Object.values(row)[value];
  }

  getPanelValue(row: any, column: any) {
    const value = parseInt(column);
    return Object.values(row)[value + this.data?.titles.length];
  }

  getItemInPanel(valueA: any, valueB: any) {
    return valueA + valueB;
  }

  setWrapperIconPosition() {
    return {
      height: this.rowHeight,
    };
  }

  orderBySelector(value: any) {
    const key = value.toString().toLowerCase();
    if (!this.order || (this.order && this.order.selector !== key)) {
      this.order = {
        selector: key,
        direction: true,
      };
      this.data?.rows.sort((a: any, b: any) => {
        return this.compare(key, true, a, b);
      });
    }
    if (this.order && this.order.selector === key) {
      const toogle = this.order.direction;
      this.order = {
        selector: key,
        direction: !toogle,
      };
      this.data?.rows.sort((a: any, b: any) => {
        return this.compare(key, !toogle, a, b);
      });
    }
  }

  returnZero() {
    return 0;
  }

  compare(prop: any, dir: boolean, a?: any, b?: any) {
    if (dir) {
      if (a[prop] < b[prop]) {
        return 1;
      }
      if (a[prop] > b[prop]) {
        return -1;
      }
      return 0;
    }

    if (a[prop] < b[prop]) {
      return -1;
    }
    if (a[prop] > b[prop]) {
      return 1;
    }
    return 0;
  }

  setPagination() {
    this.paginationArray = [];
    const res = this.data?.rows.length / this.limit;
    const groups = Math.ceil(res);
    for (let i = 1; i <= Math.floor(groups); i++) {
      this.paginationArray.push(i);
    }
    this.ref.markForCheck();
  }

  goToPage(page: number) {
    const newOffset = page * this.limit;
    this.offset = newOffset;
  }

  goToFirst() {
    this.offset = 0;
  }

  goToLast() {
    const newOffset = (this.paginationArray.length - 1) * this.limit;
    this.offset = newOffset;
  }
}

interface Order {
  selector: string;
  direction: boolean;
}
