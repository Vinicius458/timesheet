import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'cpf' })
export class CpfPipe implements PipeTransform {
  transform(value: string | number, hideSomeValues: boolean = false): string {
    let formattedValue = value + '';

    formattedValue = formattedValue
      .padStart(11, '0')
      .substr(0, 11)
      .replace(/[^0-9]/, '')
      .replace(
        // item 4
        /(\d{3})(\d{3})(\d{3})(\d{2})/,
        '$1.$2.$3-$4'
      );

    if (hideSomeValues) {
      formattedValue = 'XXX.' + formattedValue.substr(4, 7) + '-XX';
    }
    return formattedValue;
  }
}
