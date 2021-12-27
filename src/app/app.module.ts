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
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatButtonToggleModule} from '@angular/material/button-toggle';

import { MapComponent } from './screens/map/map.component';
import { EditComponent } from './screens/edit/edit.component';
import { CounterPipe } from './pipes/counter.pipe';

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
    CounterPipe
  ],
  imports: [
    NgxSliderModule,
    MatAutocompleteModule,
    MatInputModule,
    MatButtonToggleModule,
    
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
