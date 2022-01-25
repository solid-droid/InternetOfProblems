import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './screens/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { ZoomControlComponent } from './components/zoom-control/zoom-control.component';
import { TimeControlComponent } from './components/time-control/time-control.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSliderModule } from '@angular-slider/ngx-slider';

//primeNG
import {EditorModule} from 'primeng/editor';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {InputTextModule} from 'primeng/inputtext';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {DropdownModule} from 'primeng/dropdown';
import {ListboxModule} from 'primeng/listbox';

import { MapComponent } from './screens/map/map.component';
import { EditComponent } from './screens/edit/edit.component';
import { CounterPipe } from './pipes/counter.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateProblemComponent } from './screens/create-problem/create-problem.component';
import { CreateSolutionComponent } from './screens/create-solution/create-solution.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ZoomControlComponent,
    TimeControlComponent,
    SearchBarComponent,
    MapComponent,
    EditComponent,
    CounterPipe,
    CreateProblemComponent,
    CreateSolutionComponent
  ],
  imports: [
    NgxSliderModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    EditorModule,
    InputTextareaModule,
    AutoCompleteModule,
    DropdownModule,
    ListboxModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
