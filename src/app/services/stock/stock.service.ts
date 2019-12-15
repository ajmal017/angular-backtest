import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { StockData } from '../../model/stock';

/**
 * Converts SIX data into StockData.
 * @class{SixConverter}
 */
export class SixConverter {
  /**
   * Class constructor.
   * @param{any} sixData The raw data returned by SIX.
   */
  constructor(private sixData: any) {
  }

  /**
   * Transforms the provided SIX data into StockData.
   * @return {StockData} The transformed data.
   */
  asStockData(): StockData {
      return null;
  }
}

/**
 * Retrieves stock data from a provider, and then broadcasts the
 * stock updates to all subscribers.
 * @class{StockService}
 */
 @Injectable({
   providedIn: 'root'
 })
export class StockService {
  constructor(private http: HttpClient) {
  }

  getSixData(isin: String): Observable<any> {
    return this.http.get(
      '/itf/fqs/delayed/charts.json?' +
      'select=ISIN,ClosingPrice,ClosingPerformance,PreviousClosingPrice&' +
      'where=ValorId=' + isin + 'CHF4&' +
      'columns=Date,Time,Close,Open,Low,High,TotalVolume&' +
      'fromdate=19880630&netting=1440&clientApp=getDailyHLOC&type=2&line=id,6m,max,530&' +
      'dojo.preventCache=1575104481880');
  }

  getStockData(): Observable<any> {
    return forkJoin(
      this.getSixData('LU1290894820'),
      this.getSixData('LU1290894820'),
      this.getSixData('LU1290894820'));
  }
}
