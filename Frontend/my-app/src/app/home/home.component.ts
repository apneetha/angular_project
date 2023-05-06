import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { HomeService } from "../service/home.service";

import {debounceTime,map,} from "rxjs/operators";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  url: any;
  businessdetailurl: any;
  responsedata: any;
  business: any;
  businessdetails: any;
  googleurl: any;
  lat: any;
  long: any;
  data: any;
  reviewsurl: any;
  reviewts: any;
  blist = <any>[];
  bControl = new FormControl();
  keyword: any;
  bs: FormGroup;
  reserveform: FormGroup;
  show: boolean = true;


  // For Reserve and Cancel
  bname: any;
  index: any;
  todaysdate =formatDate(new Date(), 'yyyy-MM-dd', 'en');

  constructor(private http: HttpClient, private service: HomeService) {
    this.bs = new FormGroup({
      keyword: new FormControl("", Validators.required),
      distance: new FormControl("10", Validators.required),
      category: new FormControl("Default", Validators.required),
      location: new FormControl("", Validators.required),
      autolocation: new FormControl(false, Validators.required),
    });
    

    this.reserveform = new FormGroup({
      email: new FormControl("", Validators.required),
      date: new FormControl("", Validators.required),
      time: new FormControl("", Validators.required),
      time_min: new FormControl("", Validators.required),
      b_name: new FormControl(""),
    });
  }

  ngOnInit(): void {
    this.bControl.valueChanges.subscribe((term) => {
      if(term!=null)
      if (term.length > 2) {
        this.bus_search(term).subscribe((data) => {
          this.blist = data as any[];
        });
      } else {
        this.blist = [];
      }
    });
  }

  clear() {
    this.bs.reset({
      keyword: '',
      distance: '10',
      category: 'Default',
      location: '',
      autolocation: false
    });
    this.bs.get('location')?.enable();
    this.keyword = null;
    this.blist = []
    this.business=null;
    this.businessdetails=null;
   

  }


  bus_search(term: string) {
    var list = this.http.get("https://webtechnodehw8.wl.r.appspot.com/autocomplete/" + term).pipe(
      debounceTime(500), // WAIT FOR 500 MILISECONDS ATER EACH KEY STROKE.
      map((data: any) => {
        return data.length != 0 ? (data as any[]) : [];
      })
    );
    return list;
  }

  onsubmit() {
    var distance_meter = this.bs.value.distance;
    distance_meter = distance_meter * 1609;
    console.log(this.keyword);
    console.log(this.bs.value.distance);
    console.log(this.bs.value.category);
    console.log(this.bs.value.location);
    this.url ="https://webtechnodehw8.wl.r.appspot.com/search?term=" +this.keyword +"&distance=" +distance_meter +"&categories=" +this.bs.value.category +"&latitude=" +this.lat +"&longitude=" +this.long;
    console.log(this.url);
    this.http.get(this.url).subscribe((result) => {
      console.log(result)
      this.business = result;
      this.show=true;
      this.businessdetails=null;
    });
  }

  latlong() {
    var location = this.bs.value.location;

    console.log("inside latlonh");
    this.googleurl ="https://maps.googleapis.com/maps/api/geocode/json?address=" +location +"&key=AIzaSyCXEnjYmfFQAy82aa9Ft96jUPupTXjx4Co";
    this.http.get(this.googleurl).subscribe((result: any) => {
      this.data = result;
      this.lat = result.results[0].geometry.location.lat;
      this.long = result.results[0].geometry.location.lng;
      return [this.lat, this.long];
    });
  }

  autolocation() {
    if (this.bs.value.autolocation) {
      this.bs.controls["location"].reset();
      this.bs.get("location")?.disable();
      fetch("https://ipinfo.io/json?token=bd65a530dbe4c9")
        .then((res) => res.json())
        .then((data) => {
          var long_lat = data.loc.split(",");
          this.lat = long_lat[0];
          this.long = long_lat[1];
        });
    } else {
      this.bs.get("location")?.enable();
    }
  }

  displaydetails(bid: any) {
    this.businessdetailurl = "https://webtechnodehw8.wl.r.appspot.com/businessinfo/" + bid;
    this.http.get(this.businessdetailurl).subscribe((result) => {
      this.businessdetails = result;
      this.show = false;

      var bookings = JSON.parse(localStorage.getItem("Reservation") || "[]");

      for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].b_name == this.businessdetails.name) {
          this.bname = bookings[i].b_name;
          this.index = i;
          break;
        } else {
          this.bname = null;
          this.index = null;
        }
      }
      this.show = false;
    });

    this.reviewsurl = "https://webtechnodehw8.wl.r.appspot.com/reviews/" + bid;
    this.http.get(this.reviewsurl).subscribe((result) => {
      this.reviewts = result;
      this.reviewts = this.reviewts.reviews;
    });
  }

  formsumbit(business_name: any) {
    var form1 = document.getElementsByClassName("needs-validation")[0] as HTMLFormElement;
    if (form1.checkValidity() === false) {
      if (this.reserveform.value.email) {
        var email = document.getElementById("email_feedback") as HTMLFormElement;
        email.innerHTML = "Email must be a valid email address";
      } 
      else {
        var email = document.getElementById("email_feedback") as HTMLFormElement;
        email.innerHTML = "Email is required";
      }
      event?.preventDefault();
      event?.stopPropagation();
    } 
    else {
      this.reserveform.value.b_name = business_name;
      var form = this.reserveform.value;
      var localdata = localStorage.getItem("Reservation");
      var localdata_json = [];
      if (localdata) 
        localdata_json = JSON.parse(localdata);
      
      localdata_json.push(form);
      localStorage.setItem("Reservation", JSON.stringify(localdata_json));
      var ls = JSON.parse(localStorage.getItem("Reservation") || "[]");

      this.index = localdata_json.length - 1;   // For Cancel Button
      this.bname = business_name;               // For Cancel Button
      var closebutton = document.getElementById("close_button") as HTMLElement;
      alert("Reservation created!");
      closebutton.click();
    }
    form1.classList.add("was-validated");
  }

  emailcheck(emailid: any)
  {
      if(emailid.data)
      {
        var email = document.getElementById('email_feedback') as HTMLFormElement;
        email.innerHTML = "Email must be a valid email address"        
      }
      else
      {
        var email = document.getElementById('email_feedback') as HTMLFormElement;
        email.innerHTML = "Email is required"    
      }
  }

  r_cancel(index: any) {
    var bookingstored = JSON.parse(localStorage.getItem("Reservation") || "[]");

    bookingstored.splice(index, 1);
    localStorage.setItem("Reservation", JSON.stringify(bookingstored));
    var a = JSON.parse(localStorage.getItem("Reservation") || "[]");

    this.bname = null;
    this.index = null;
    alert("Reservation Cancelled!");
    this.reset_res();
  }
  
  show_table() {
    this.show = true;
    this.businessdetails = null;
    let a = document.getElementById('first_row');
    a?.scrollIntoView();
  }

  reset_res() {
    var form = document.getElementById("res_form") as HTMLFormElement;
    form.className = "needs-validation ng-untouched ng-pristine ng-invalid";
    this.reserveform.reset({
      emmail: '',
      date: '',
      time:'',
      time_min:'',
      b_name:''
    });
  }
}
