import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatTabsModule } from '@angular/material/tabs';
import { BookingsComponent } from './bookings/bookings.component';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; 
const material = [

  MatAutocompleteModule
]

@NgModule({ 
  declarations: [
    AppComponent,
    HomeComponent,
    BookingsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatAutocompleteModule,
    RouterModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSelectModule,
    GoogleMapsModule,
    MatTabsModule,
   

    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }