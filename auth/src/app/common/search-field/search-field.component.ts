import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFieldComponent implements OnInit {

  @Output() newValue: EventEmitter<string> = new EventEmitter();
  searchControl: FormControl = new FormControl();

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // this.cd.detach();
    this.searchControl.valueChanges.pipe(
      debounceTime(1000)
    ).subscribe(
      val => this.newValue.emit(val)
    );
  }

}
