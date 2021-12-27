import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'counter'
})
export class CounterPipe implements PipeTransform {


  transform(value: number, ...args: unknown[]): string {
    return this.getCount(value.toString());
  }
  getCount(value: string) {
    let count = '0';

    if (value.length < 4)       count = value;
    else if (value.length < 5)  count = this.getRound(value) + 'K';
    else if (value.length < 6)  count = this.getRound(value , 1) + 'K';
    else if (value.length < 7)  count = this.getRound(value , 2) + 'K';
    else if (value.length < 8)  count = this.getRound(value) + 'M';
    else if (value.length < 9)  count = this.getRound(value,1) + 'M';
    else if (value.length < 10) count = this.getRound(value,2) + 'M';
    else                        count = '1B+';
    
    return count;
  }

  getRound(value: string , places = 0) {
      if(places == 0){
        if(value[1] == '0')   return value[0];
        else                  return value[0] + '.' + value[1];
      } else if (places == 1) return value.substring(0,2);
        else                  return value.substring(0,3);
    }

}
