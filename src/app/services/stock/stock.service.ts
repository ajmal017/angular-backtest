import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { map, mergeMap } from 'rxjs/operators';
import { QuotesFromSixService } from './six-connection.service';
import { QuotesFromYahooService } from './yahoo-connection.service';
import { HistoricalQuotes, Dividend } from 'src/app/model/core/quotes';
import { QuotesConfigurationService, QuoteSourceAndProvider, SourceAndProvider } from './securities-configuration.service';
import { QuotesFromSimpleCsvService } from './date-yield-connection.service';

/**
 * Retrieves stock data from a provider, and then broadcasts the
 * stock updates to all subscribers.
 * @class{QuotesService}
 */
 @Injectable({
   providedIn: 'root'
 })
export class QuotesService {
  constructor(private quotesFromSixService: QuotesFromSixService,
              private quotesFromYahooService: QuotesFromYahooService,
              private quotesFromSimpleCsvService: QuotesFromSimpleCsvService,
              private quotesConfigurationService: QuotesConfigurationService) {
  }

  private makeItGood(source: string): string {
    return "../../../assets/quotes/" + source;
  }

  getHistoricalQuotes(names: string[]): Observable<HistoricalQuotes> {
    let oo: Observable<HistoricalQuotes>[] = [];

    names.forEach(name => {
      let quoteSourceAndProvider: QuoteSourceAndProvider =
        this.quotesConfigurationService.obtainQuoteSourceAndProvider(name);

      let o: Observable<HistoricalQuotes> = this.obtainQuote(quoteSourceAndProvider)
        .pipe(mergeMap(s => {
          return this.obtainDividends(quoteSourceAndProvider.dividends, quoteSourceAndProvider.name)
            .pipe(map(d =>{
              s.enrichWithDividends(d);
              return s;
            }));
        }));
      oo.push(o);
    });

    return forkJoin(oo)
      .pipe(map(s => {
        let historicalQuotes: HistoricalQuotes;
        s.forEach((d: HistoricalQuotes) => {
          if (historicalQuotes) {
            historicalQuotes.merge(d);
          } else {
            historicalQuotes = d;
          }
        });
        return historicalQuotes;
      }));
  }

  private obtainDividends(sourceAndProvider: SourceAndProvider, name: string): Observable<Dividend[]> {
    let source = this.makeItGood(sourceAndProvider.source);

    switch(sourceAndProvider.provider) {
      case "date.yield.csv":
        return this.quotesFromSimpleCsvService.getDividends(source, name);
      default:
        console.warn(sourceAndProvider.provider + " - Unknown provider for dividends");
        return null;
    }
  }

  private obtainQuote(quoteSourceAndProvider: QuoteSourceAndProvider): Observable<HistoricalQuotes> {
    let source = this.makeItGood(quoteSourceAndProvider.source);

    switch(quoteSourceAndProvider.provider) {
      case "www.six-group.com":
        return this.quotesFromSixService.getHistoricalQuotes(source, quoteSourceAndProvider.name);
      case "finance.yahoo.com":
        return this.quotesFromYahooService.getHistoricalQuotes(source, quoteSourceAndProvider.name);
      default:
        console.warn(quoteSourceAndProvider.provider + " - Unknown provider");
        return null;
    }
  }
}
