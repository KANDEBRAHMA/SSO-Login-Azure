import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { MSAL_GUARD_CONFIG, MSAL_INSTANCE, MSAL_INTERCEPTOR_CONFIG, MsalBroadcastService, MsalGuard, MsalGuardConfiguration, MsalInterceptor, MsalInterceptorConfiguration, MsalRedirectComponent, MsalService, ProtectedResourceScopes } from '@azure/msal-angular';
import { IPublicClientApplication, InteractionType, LogLevel, PublicClientApplication } from '@azure/msal-browser';
import { environment } from 'src/environments/environment';

function MSALInstanceFactory():IPublicClientApplication{
    return new PublicClientApplication({
        auth:{
            clientId: environment.auth.clientId,
            authority: `https://login.microsoftonline.com/${environment.auth.tenantId}`,
            redirectUri: environment.auth.redirectUri
        },
        // cache: {
        //     cacheLocation: 'sessionstorage',
        // },
        system:{
            loggerOptions:{
                loggerCallback: (level,message,conatinsPii) =>{
                    console.log(message);
                },
                logLevel: LogLevel.Verbose
            }
        }
    })
}

function MsalGuardConfigFactory(): MsalGuardConfiguration{
    return {
        interactionType: InteractionType.Redirect,
        authRequest: {
            scopes:["user.read"],
        }
    }
}

function MsalInterceptorConfigFactory(): MsalInterceptorConfiguration{
    const myProtectedResourcesMap = new Map<string, Array<string | ProtectedResourceScopes > | null>();
    myProtectedResourcesMap.set('https://graph.microsoft.com/v1.0/me',[{
        httpMethod: 'GET',
        scopes:['user.read']
    }]);
    myProtectedResourcesMap.set('http://localhost:8080/userDetails',['user.read'])
    return {
        interactionType: InteractionType.Popup,
        protectedResourceMap: myProtectedResourcesMap,
        authRequest: (msalService, httpReq, originalAuthRequest)=>{
            return {
                ...originalAuthRequest
            }
        }
    }
}

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ProfileComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: MSAL_INSTANCE,
            useFactory: MSALInstanceFactory
        },
        {
            provide: MSAL_GUARD_CONFIG,
            useFactory: MsalGuardConfigFactory
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: MsalInterceptor,
            multi: true
        },
        {
            provide: MSAL_INTERCEPTOR_CONFIG,
            useFactory: MsalInterceptorConfigFactory
        },
        MsalService,
        MsalBroadcastService,
        MsalGuard,
        AppComponent
    ],
    bootstrap: [AppComponent, MsalRedirectComponent]
})
export class AppModule { }
