import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-time-control',
  templateUrl: './time-control.component.html',
  styleUrls: ['./time-control.component.scss']
})
export class TimeControlComponent implements OnInit {

  dateRange: Date[] = this.createDateRange();
  value: number = this.dateRange[0].getTime();
  options:any = {
    stepsArray: this.dateRange.map((date: Date) => {
      return { value: date.getTime() };
    }),
    translate: (value: number, label: any): string => {
      return new Date(value).toDateString();
    }
  };

  createDateRange(): Date[] {
    const dates: Date[] = [];
    for (let i: number = 1; i <= 31; i++) {
      dates.push(new Date(2018, 5, i));
    }
    return dates;
  }

  ngOnInit(): void {
  }

}
