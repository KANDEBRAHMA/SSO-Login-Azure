import { Component, OnInit } from '@angular/core';
import { Profile } from '../profile';
import { ProfileService } from '../profile.service';
import { MsalService } from '@azure/msal-angular';
import { AppComponent } from '../app.component';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    profile: Profile |undefined;
    activeUser: string|undefined =" "

    constructor(private profileService: ProfileService,
                private msalService: MsalService,
                private appComponent: AppComponent) { }

    ngOnInit(): void {
        this.getProfile();
        this.activeUser = this.appComponent.activeUser
        console.log(this.appComponent.activeUser)
    }

    getProfile(): void {
        this.profileService.getProfile()
            .subscribe(profile => this.profile = profile);
    }
}
