import { Component, OnInit, Output, Inject, forwardRef, EventEmitter } from '@angular/core';
import { DataTable } from './table.component';
import { HEADER_TEMPLATE } from './header.template';
import { HEADER_STYLE } from "./header.style";
import {FormControl} from "@angular/forms";
import {Observable} from 'rxjs/Rx'

@Component({
  selector: 'data-table-header',
  template: HEADER_TEMPLATE,
  styles: [HEADER_STYLE],
  host: {
    '(document:click)': '_closeSelector()'
  }
})
export class DataTableHeader implements OnInit {

    columnSelectorOpen = false;
    filterControl: FormControl = new FormControl();

    @Output() filterChangeEvent: EventEmitter<string> = new EventEmitter();

    _closeSelector() {
        this.columnSelectorOpen = false;
    }

    constructor(@Inject(forwardRef(() => DataTable)) public dataTable: DataTable) {}

    ngOnInit() {
        this.filterControl.valueChanges
            .debounceTime(500)
            .distinctUntilChanged()
            .subscribe((term: string) => {
                this.filterChangeEvent.emit(term);
            });
    }

}
