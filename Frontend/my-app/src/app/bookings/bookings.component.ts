import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.css']
})
export class BookingsComponent implements OnInit {

  bookings:any;
  constructor() {
    this.bookings=JSON.parse(localStorage.getItem('Reservation') || '[]' );

   }

  ngOnInit(): void {


  }

  b_Delete(index:any){
      this.bookings.splice(index,1);
      localStorage.setItem('Reservation',JSON.stringify(this.bookings));

    }

}
