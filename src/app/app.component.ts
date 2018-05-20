import { Component, OnInit, Input } from '@angular/core';
import { User } from './shared/models';
import { PagerService } from './shared/services';
import { AppService } from './app.service';
import * as _ from 'lodash';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'Rindus';

    pager: any = {};
    pagedResults: any[];
    users: Array<User>;
    user: User;
    isCreation: boolean;
    message: string;
    errorNameRequired: boolean;
    errorSurnameRequired: boolean;
    errorIBANRequired: boolean;
    errorIBANNotValid: boolean;

    private regexIBAN = new RegExp('\b[A-Za-z]{2}[0-9]{2}(?:[ ]?[0-9]{4}){4}(?!(?:[ ]?[0-9]){3})(?:[ ]?[0-9]{1,2})?\b');

    /* MOCKED RESULTS */
    private USERS = [
        {   
            id: 1,
            name: 'Peter',
            surname: 'Hamilton',
            IBAN: 'AD0218306986349328381164'
        },
        {
            id: 2,
            name: 'Li',
            surname: 'Yang',
            IBAN: 'AD7053810645946530968571'
        },
        {
            id: 3,
            name: 'Luc',
            surname: 'Walker',
            IBAN: 'AD6242876312942055676526'
        },
        {
            id: 4,
            name: 'Micheal',
            surname: 'Vettel',
            IBAN: 'AD4556659282917181556453'
        },
        {
            id: 5,
            name: 'Peter',
            surname: 'Hamilton',
            IBAN: 'AD0218306986349328381164'
        },
        {
            id: 6,
            name: 'Li',
            surname: 'Yang',
            IBAN: 'AD7053810645946530968571'
        },
        {
            id: 7,
            name: 'Luc',
            surname: 'Walker',
            IBAN: 'AD6242876312942055676526'
        },
        {
            id: 8,
            name: 'Micheal',
            surname: 'Vettel',
            IBAN: 'AD4556659282917181556453'
        },
        {
            name: 'Peter',
            surname: 'Hamilton',
            IBAN: 'AD0218306986349328381164'
        },
        {
            id: 9,
            name: 'Li',
            surname: 'Yang',
            IBAN: 'AD7053810645946530968571'
        },
        {
            id: 10,
            name: 'Luc',
            surname: 'Walker',
            IBAN: 'AD6242876312942055676526'
        },
        {
            id: 11,
            name: 'Micheal',
            surname: 'Vettel',
            IBAN: 'AD4556659282917181556453'
        }
    ];

    constructor(
        private pagerService: PagerService,
        private usersService: AppService
    ) {}

    ngOnInit() {
        // this.getUsers();
        _.set(this, 'users', this.USERS);
        _.set(this, 'isCreation', true);
        _.set(this, 'user', {});
        this.clearErrors();
        this.setPage(1);
    }

    public setPage(page: number) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }

        this.pager = this.pagerService.getPager(this.users.length, page);
        this.pagedResults = this.users.slice(this.pager.startIndex, this.pager.endIndex + 1);
    }

    public selectUser(pos: number){
        this.clearErrors();
        _.set(this, 'user', _.cloneDeep(_.get(this, 'users['+ pos + ']', {})));
        _.set(this, 'isCreation', false);
        scroll(0, 0);
    }
    
    public cancel(){
        this.clearErrors();
        _.set(this, 'user', {});
        _.set(this, 'isCreation', true);
    }

    public delete(pos: number){
        this.clearErrors();
        this.users.splice(pos, 1);
        this.setPage(1);
        // this.deleteUser(_.get(this, 'users['+ pos + '].id'));
    }

    public update(){
        this.validate()
        if(!this.errorNameRequired && !this.errorSurnameRequired &&
           !this.errorIBANRequired && !this.errorIBANNotValid) {
            let user = _.find(this.users, (u: User) => u.id === this.user.id);
            this.setPage(1);
            // this.updateUser();
        }
    }

    public create(){
        this.validate();
        if(!this.errorNameRequired && !this.errorSurnameRequired &&
           !this.errorIBANRequired && !this.errorIBANNotValid) {
            this.users.unshift(this.user);
            this.setPage(1);
            _.set(this, 'user', {});
            // this.createUser();
        }
    }

    private validate(){
        this.clearErrors();
        if (_.isNil(this.user.name) || this.user.name === '') {
            _.set(this, 'errorNameRequired', true);
        }
        if (_.isNil(this.user.surname) || this.user.surname === '') {
            _.set(this, 'errorSurnameRequired', true);
        }
        if(_.isNil(this.user.IBAN) || this.user.IBAN === '') {
            _.set(this, 'errorIBANRequired', true);
        } else if (!this.regexIBAN.test(this.user.IBAN)) {
            _.set(this, 'errorIBANNotValid', true);
        }
    }

    private clearErrors(){
        _.set(this, 'errorNameRequired', false);
        _.set(this, 'errorSurnameRequired', false);
        _.set(this, 'errorIBANRequired', false);
        _.set(this, 'errorIBANNotValid', false);
    }

    private getUsers(){
        this.usersService.getUsers()
            .subscribe((results: Array<User>) => 
                {
                    this.users = results;
                    this.setPage(1);
                },
                (error) => {
                    console.error('Error get users');
                }
        );
    }

    private updateUser(){
        this.usersService.updateUser(this.user)
            .subscribe((result: boolean) => 
                {
                    if(!result){
                        console.error('Error updating user'); 
                    }
                },
                (error) => {
                    console.error('Error updating user');
                }
        );
    }

    private createUser(){
        this.usersService.createUser(this.user)
            .subscribe((result: boolean) => 
                {
                    if(!result){
                        console.error('Error creating user'); 
                    }
                },
                (error) => {
                    console.error('Error creating user');
                }
        );
    }

    private deleteUser(id: string){
        this.usersService.deleteUser(id)
            .subscribe((result: boolean) => 
                {
                    if(!result){
                        console.error('Error deleting user'); 
                    }
                },
                (error) => {
                    console.error('Error deleting user');
                }
        );
    }
}
