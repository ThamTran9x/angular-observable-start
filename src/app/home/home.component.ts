import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { map, filter } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  list = [1, 2, 3, 4];
  file = { name: 'test'};
  private firstObsSbuscription: Subscription;
  constructor() { }

  ngOnInit() {
    // example 1 - short form of interval()
    // this.firstObsSbuscription = interval(1000).subscribe(
    //   count => {
    //     console.log(count);
    //   }
    // );

    //example2 - here is the way example 1 runs under the hood
    const customIntervalObservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count === 5) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error('Count is greater than 3!'));
          }
          count++;
        }, 1000);
      }
    );

    this.firstObsSbuscription = customIntervalObservable.pipe(filter( (data: number) => {
      // return data % 2 === 1; // filter only data %2
      return data > 1;
    }), map( (data: number) => {
      return 'Round' + ( data + 1);
    })).subscribe( data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');

    });
  }
  //End example 2

  ngOnDestroy() {
    this.firstObsSbuscription.unsubscribe();
  }

  deleteFile(file: any) {}

}
