import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MsalBroadcastService, MsalService } from '@azure/msal-angular';
import { AuthenticationResult, EventMessage, EventType, InteractionStatus } from '@azure/msal-browser';
import { Subject } from 'rxjs';
import {filter, take, takeUntil } from "rxjs/operators";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
    title = 'SSO-Login';
    activeUser: string | undefined = "unknown user";
    isAuthenticated = false
    logoUrl = "../assets/logo.jpeg"

    private unsubscribe = new Subject<void>();

    constructor(private msalService: MsalService,
                private msalBrodcastService: MsalBroadcastService,
                private router: Router,
                private httpClient: HttpClient){}

    login(): void {
        // this.msalService.instance.loginPopup({
        //     scopes:["User.Read"]
        // });
        this.msalService.instance.loginRedirect(
            {scopes:["User.Read"]}
        )
        console.log(sessionStorage)
    }

    logout(): void{
        this.msalService.instance.logoutPopup(
            {mainWindowRedirectUri: "/"}
        );
        this.router.navigate(['']);
    }
    ngOnInit(): void {
        this.msalBrodcastService.inProgress$.pipe(
            filter((status: InteractionStatus) => status === InteractionStatus.None),
            takeUntil(this.unsubscribe)
        ).subscribe(()=>{
            this.setAuthenticationStatus();
        })

        this.msalBrodcastService.msalSubject$
        .pipe(
            filter((message: EventMessage) => message.eventType === EventType.LOGIN_SUCCESS),
            takeUntil(this.unsubscribe)
        ).subscribe((message: EventMessage) =>{
            const authResult = message.payload as AuthenticationResult;
            this.msalService.instance.setActiveAccount(authResult.account);
        })
    }

    ngOnDestroy(): void {
        this.unsubscribe.next(undefined);
        this.unsubscribe.complete();
    }

    setAuthenticationStatus(): void{
        let activeAccount = this.msalService.instance.getActiveAccount();

        if(!activeAccount && this.msalService.instance.getAllAccounts().length > 0){
            activeAccount = this.msalService.instance.getAllAccounts()[0];
            this.msalService.instance.setActiveAccount(activeAccount);
        }
        this.isAuthenticated = !!activeAccount;
        this.activeUser = activeAccount?.username;
    }
}
