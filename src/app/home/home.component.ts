import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  private firstObsSbuscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSbuscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );
    const customIntervalObservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
          count++;
        }, 1000);
      }
    );

    this.firstObsSbuscription = customIntervalObservable.subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    });
  }

  ngOnDestroy() {
    this.firstObsSbuscription.unsubscribe();
  }

}
