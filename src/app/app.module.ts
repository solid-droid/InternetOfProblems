import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from 'src/environments/environment';

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
import {MessageService} from 'primeng/api';
import { MapComponent } from './screens/map/map.component';
import { EditComponent } from './screens/edit/edit.component';
import { CounterPipe } from './pipes/counter.pipe';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CreateProblemComponent } from './screens/create-problem/create-problem.component';
import { CreateSolutionComponent } from './screens/create-solution/create-solution.component';
import { LoginComponent } from './screens/login/login.component';
import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider} from 'angularx-social-login';
import { RoutingComponent } from './components/routing/routing.component';
import {ToastModule} from 'primeng/toast';
import { CreateRelationsComponent } from './screens/create-relations/create-relations.component';
import {SidebarModule} from 'primeng/sidebar';
import { UserDetailsComponent } from './screens/user-details/user-details.component';
import { DocsComponent } from './screens/docs/docs.component';

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
    CreateSolutionComponent,
    LoginComponent,
    RoutingComponent,
    CreateRelationsComponent,
    UserDetailsComponent,
    DocsComponent
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
    InputTextModule,
    SocialLoginModule,
    ToastModule,
    SidebarModule
  ],
  providers: [ 
    {
    provide: 'SocialAuthServiceConfig',
    useValue: {
      autoLogin: false,
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            environment.googleLogin
          )
        },
      ]
    } as SocialAuthServiceConfig,
  },
  MessageService
],
  bootstrap: [AppComponent]
})
export class AppModule { }
