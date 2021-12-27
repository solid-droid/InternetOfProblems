import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  @Input() selection: any;

  @Output() showMenu = new EventEmitter<boolean>();


  constructor() { }

  closeEditMenu() {
    this.showMenu.emit(false);
  }

  expandMenu() {

  }

  ngOnInit(): void {
  }

}
