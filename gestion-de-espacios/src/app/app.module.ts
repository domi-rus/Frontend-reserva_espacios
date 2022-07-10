// Modules

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { JwtModule } from "@auth0/angular-jwt";
// Directives

import { AdminDirective } from './directives/admin.directive';

// Components

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { WorkspaceComponent } from './components/workspace/workspace.component';
import { ProfileComponent } from './components/profile/profile.component';
import { PasswordComponent } from './components/profile/password/password.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { UiComponent } from './components/calendar/ui/ui.component';
import { ReserveComponent } from './components/calendar/reserve/reserve.component';
import { SpaceComponent } from './components/workspace/space/space.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { EditProfileComponent } from './components/profile/edit-profile/edit-profile.component';
import { ConfSpaceComponent } from './components/workspace/conf-space/conf-space.component';
import { FilterMembersPipe } from './pipes/filter.members.pipe';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    LoginComponent,
    RegisterComponent,
    WorkspaceComponent,
    ProfileComponent,
    PasswordComponent,
    CalendarComponent,
    UiComponent,
    ReserveComponent,
    AdminDirective,
    SpaceComponent,
    NotFoundComponent,
    EditProfileComponent,
    ConfSpaceComponent,
    FilterMembersPipe,
    FilterMembersPipe

  ],
  imports: [

    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
