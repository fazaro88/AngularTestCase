import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { environment } from '../environments/environment';
import * as _ from 'lodash';
import * as moment from 'moment';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = `${environment.title}`;

    jackPot: any;
    date: string;
    year: string;
    fullDate: string;
    numbers: any;
    euroNumbers: any;
    results: any;

    /* CONSTANTS */
    private romanNumber = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];
    private infoLottery = ['5 Numbers + 2 Euronumbers', '5 Numbers + 1 Euronumber', '5 Numbers + 0 Euronumbers',
                           '4 Numbers + 2 Euronumbers', '4 Numbers + 1 Euronumber', '4 Numbers + 0 Euronumber',
                           '3 Numbers + 2 Euronumbers', '2 Numbers + 2 Euronumbers', '3 Numbers + 1 Euronumber',
                           '3 Numbers + 0 Euronumbers', '1 Number + 2 Euronumbers', '2 Numbers + 1 Euronumber'];

    constructor(
        private jackPotService: AppService
    ) {}

    ngOnInit() {
        _.set(this, 'jackPot', {});
        // this.getJackpot();
        this.getMockedJackpot();
    }

    // private getJackpot() {
    //     this.jackPotService.getJackpot()
    //         .subscribe(
    //             (results: Array<any>) => {
    //                 this.jackPot = results;
    //             },
    //             (error) => { console.error('Error get jackPot'); });
    // }

    public showTable() {
        return !_.isEmpty(this.results);
    }

    private createTableResults() {
        const results = [];
        const infoJackPot = _.get(this, 'jackPot.last.odds', {});

        let pos = 0;
        _.forEach(infoJackPot, (rank: any) => {
            const infoResult = [];
            infoResult.push(_.get(this, 'romanNumber[' + pos + ']', ''));
            infoResult.push(_.get(this, 'infoLottery[' + pos + ']', ''));
            infoResult.push(_.get(rank, 'winners', 0));
            infoResult.push({prize: _.get(rank, 'prize', 0), specialPrize: _.get(rank, 'specialPrize', 0)});
            results.push(infoResult);
            pos++;
        });

        _.set(this, 'results', results);
    }

    private getMockedJackpot() {
        this.jackPotService.getMockedJackpot()
            .subscribe(
                (results: Array<any>) => {
                    this.jackPot = results;
                    if (!_.isNil(this.jackPot.last) && !_.isNil(this.jackPot.last.date)) {
                        const year = _.get(this, 'jackPot.last.date.year', '');
                        const month = _.get(this, 'jackPot.last.date.month', '');
                        const days = _.get(this, 'jackPot.last.date.day', '');
                        _.set(this, 'date', moment([year, month, days]).format('dd DD MMM'));
                        _.set(this, 'fullDate', moment([year, month, days]).format('dddd DD MMM YYYY'));
                        _.set(this, 'year', year);
                        _.set(this, 'numbers', _.get(this, 'jackPot.last.numbers', []));
                        _.set(this, 'euroNumbers', _.get(this, 'jackPot.last.euroNumbers', []));
                        this.createTableResults();
                    }
                },
                (error) => { console.error('Error get jackPot'); });
    }
}
