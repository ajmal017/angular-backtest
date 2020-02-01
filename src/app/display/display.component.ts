import { Component, OnInit } from '@angular/core';
import { StockService } from '../services/stock/stock.service';
import { Simulation } from '../model/core/simulation';
import { SwissQuoteAccount } from '../model/account.swissquote';
import { BuyAndHoldStrategy } from '../model/strategy.buy-and-hold';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { Ng2ChartReport, ShowDataAs, ShowDataOn } from './ng2-chart.data-processor';
import { RegularTransfer, RegularPeriod } from '../model/core/transfer';
import { Account } from '../model/core/account';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent implements OnInit {
  simulation: Simulation;
  ng2ChartReport: Ng2ChartReport;

  dataSets: ChartDataSets[];
  labels: Label[];
  options: ChartOptions;

  constructor(private stockService:StockService) {
  }

  ngOnInit() {
    this.ng2ChartReport = new Ng2ChartReport([
      {
        show: "SQA01.NAV",
        as: ShowDataAs.LINE,
        on: ShowDataOn.RIGHT
      },
      {
        show: "LU1290894820.CLOSE",
        as: ShowDataAs.LINE,
        on: ShowDataOn.LEFT
      },
      {
        show: "EXPENSES.CASH",
        as: ShowDataAs.LINE,
        on: ShowDataOn.LEFT
      }
    ]);
    this.dataSets = this.ng2ChartReport.dataSets;
    this.labels = this.ng2ChartReport.labels;
    this.options = this.ng2ChartReport.options;

    // Fetch the data:
    this.stockService.getStockData(['LU1290894820CHF4', 'CH0017810976CHF9']).subscribe(data => {

      // Set up the simulation:
      this.simulation = new Simulation({
        account: new SwissQuoteAccount({
          id: "SQA01",
          cash: 100000,
          strategy: new BuyAndHoldStrategy({
            isin: "LU1290894820",
            transfer: new RegularTransfer({
              transfer: 100,
              to: new Account({
                id: "EXPENSES"
              }),
              every: RegularPeriod.MONTH
            })})
        }),
        stockData: data,
        report: this.ng2ChartReport
      });

      // Run the simulation:
      this.simulation.run(new Date(2010, 1, 1), new Date (2020, 12, 31));
    });
  }
}
