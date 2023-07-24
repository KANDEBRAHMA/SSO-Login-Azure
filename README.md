# SSO Login Authentication using MSAL in Azure AD

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.1.2.

## What is Single Sign On

Single sign-on is a session and authentication service that allows users to access multiple applications or systems with a single set of credentials.
We can achieve single sign-on using Office 365 by using MSAL (MicroSoft Authentication Library).

<b>MSAL Flow in Single Page Applications(SPA)</b>

<img width="542" alt="image" src="https://github.com/KANDEBRAHMA/SSO-Login-Azure/assets/65330501/1d2dddf2-1929-4e10-a7fe-abcd424afa4a">

We need to configure the following things in Angular SPA.
  1. MSAL INSTANCE
  2. MSAL GUARD
  3. MSAL INTERCEPTOR

## MSAL Instance
  To configure ClientApplication for accessing the app registered in Azure AD, we need to provide this information.
    1. Client ID
    2. Authority(Tenant Id)
    3. RedirectUri
    
## MSAL GUARD
  1. It ensures that user is authenticated before allowing the user to navigate to specific routes.
  2. It integrates with routing mechanism of the application to provide authorization checks.
  3. This enables security to the app and ensures that only authorizes users can interact with sensitive information.

## MSAL INTERCEPTOR
  1. It is used to make HTTP requests to protected resources.
  2. When a request is made it automatically adds necessary authentication tokens to request headers.
  3. We should also configure the consent/scope that is required to access that API service.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
