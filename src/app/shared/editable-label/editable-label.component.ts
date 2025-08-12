import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  signal,
} from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-label',
  standalone: true,
  templateUrl: './editable-label.component.html',
  imports: [NgIf, FormsModule],
  styleUrls: ['./editable-label.component.css'],
})
export class EditableLabelComponent {
  @Input() value: string = '';
  @Output() valueChange = new EventEmitter<string>();

  private oldValue: string = '';
  private editModeSignal = signal(false);

  @ViewChild('inputBox') inputBox?: ElementRef<HTMLInputElement>;

  editMode() {
    return this.editModeSignal();
  }

  enterEditMode() {
    this.oldValue = this.value;
    this.editModeSignal.set(true);
    setTimeout(() => {
      this.inputBox?.nativeElement.focus();
    });
  }

  commit() {
    this.editModeSignal.set(false);
    this.valueChange.emit(this.value);
  }

  cancel() {
    this.editModeSignal.set(false);
    this.value = this.oldValue;
  }

  onValueChange(val: string) {
    this.value = val;
  }
}
