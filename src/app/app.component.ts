import { Component, OnInit, ViewChild } from '@angular/core';
import { CurrencyFetchService } from './currency-fetch.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('from') selectFrom: any;
  @ViewChild('to') selectTo: any;

  public result!: string;
  public currencyIds: string[] = [];

  public fromInput!: string;
  public toInput!: string;

  constructor(private currency: CurrencyFetchService) {}

  ngOnInit() {
    this.currency.getCurrencies().subscribe((response) => {
      let _tmp = Object.values(response)[0];
      Object.keys(_tmp).forEach((item) => this.currencyIds.push(item));
    });

    this.fromInput = this.currencyIds[0];
    this.toInput = this.currencyIds[0];
  }

  onClick(): void {
    this.currency
      .getData(this.fromInput, this.toInput)
      .subscribe((response) => (this.result = Object.values(response)[0]));
  }

  onInput(): void {
    this.onClick();
  }

  onRotate(): void {
    [this.fromInput, this.toInput] = [this.toInput, this.fromInput];
    this.onClick();
  }
}
