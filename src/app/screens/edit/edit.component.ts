import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { Editor } from 'ngx-editor';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl} from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit, OnDestroy, OnChanges {

  allowEdit = false;
  expand = false;
  editor: any;
  html: string = `<h1>Hello World!</h1>`;
  toolbar:any = [
    ["bold", "italic", "underline", "strike"],
    ["align_left", "align_center", "align_right", "align_justify"],
    ["text_color", "background_color"],
    ["ordered_list", "bullet_list"],
    ["link", "image", "code", "blockquote", { heading: ["h1", "h2", "h3", "h4", "h5", "h6"] }],
  ];
  @Input() selection: any;

  @Output() showMenu = new EventEmitter<boolean>();


  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]> | undefined;
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];
  
  @ViewChild('fruitInput')
  fruitInput!: ElementRef<HTMLInputElement>;
 
  constructor() {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allFruits.slice())),
    );
   }
  ngOnChanges(changes: any) {
    if (changes.selection.currentValue) {
      this.html = changes.selection.currentValue.content.description;
      this.fruits = changes.selection.currentValue.content.tags;
      this.allowEdit = false;
    }
  }

  onChange($event: any) {
    this.html = $event;
  }

  closeEditMenu() {
    this.showMenu.emit(false);
  }

  expandMenu() {
    this.expand = true;
  } 

  closeExpandMenu() {
    this.expand = false;
  }
  
  ngOnInit(): void {
    this.editor = new Editor();
  }

  ngOnDestroy(): void {
    this.editor.destroy();
  }

  add(event: any): void {
      const value = (event.value || '').trim();

      // Add our fruit
      if (value) {
        this.fruits.push(value);
      }
  
      // Clear the input value
      event.chipInput!.clear();
  
      this.fruitCtrl.setValue(null);   
  }

  remove(fruit: string): void {
    const index = this.fruits.indexOf(fruit);

    if (index >= 0) {
      this.fruits.splice(index, 1);
    }
  }

  selected(event:any): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

}
