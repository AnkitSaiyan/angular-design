# Diflexmo Angular Design System

## Usage

### Install NPM package

`npm install diflexmo-angular-design`

### Add assets to **angular.json**

Add the assets to angular.json assets section like this:

```
"assets": [
            {
              "glob": "**/*",
              "input": "./node_modules/diflexmo-angular-design/assets",
              "output": "./assets"
            }
  ],
```

### Import modules in **app.module.ts**

Add DesignSystemCoreModule and DesignSystemModule to the imports of the app module

## Migration to new navigation-bar component (v. 20231.26.23)

### Navigation items
 All navigation items should be passed as an array of objects to **[navigationItems]** input property of navigation-bar component. Please, update previous implementation, such as:
```
<dfm-navigation-item icon="home-03" title="Dashboard" routerLink="/" [exact]="true"></dfm-navigation-item>
<dfm-navigation-item icon="speedometer-02" title="OVER-C Edge" routerLink="/overc-edge"></dfm-navigation-item>
```
To this one:
```
new NavigationItem('Dashboard', 'home-03', '/', true),
new NavigationItem('OVER-C Edge', 'speedometer-02', '/overc-edge')
```
If you need to pass child navigation items, you can specify them in NavigationItem object:
```
new NavigationItem('Operations', 'dots-grid', undefined, false, true, [
      new NavigationItem('Problems', 'package-x', '/operations/problems'),
      new NavigationItem('All events', 'notification-text', '/operations/events'),
      new NavigationItem('Insights', 'line-chart-up-01', '/operations/insights'),
      new NavigationItem('Configurations', 'package-x', '/operations/configurations'),
    ])
```
### Tenants dropdown and profile items
 Tenant dropdown and profile items have been moved directly to navigation bar component. Please, remove them from the code and use **[tenants]**, **[currentTenant]**, **(tenantChanged)** properties of navigation-bar.
Before:
```
<dfm-navigation-bar [content]="content">
  ...
  <ng-template #profileItems>
    <dfm-navigation-item-tenant
      title="Tenants"
      [tenants]="tenants"
      [currentTenantValue]="currentTenant"
      (tenantChanged)="changeTenant($event)"
    ></dfm-navigation-item-tenant>
    <dfm-navigation-item icon="user-01" title="Profile"></dfm-navigation-item>
  </ng-template>
</dfm-navigation-bar>
```
After
```
<dfm-navigation-bar 
    [tenants]="tenants"
    [currentTenant]="currentTenant"
    (tenantChanged)="changeTenant($event)"
  >
  </dfm-navigation-bar>
```

### Content
All content of page should go into navigation bar tag. The example of change:
From
```
<dfm-navigation-bar [content]="content"> ... <dfm-navigation-bar>
<div class="content"></div>
```
To
```
<dfm-navigation-bar><div class="content"></div><dfm-navigation-bar>

```
### Messages and notifications
New properties such as **[isTenantDropdownShown]**, **[isNotificationsCounterShown]**, **[isMessagesCounterShown]** have been added. Please, use them in order to configure what should be displayed in navigation bar
To pass notifications and messages use **[notifications]** and **[messages]** properties. In order to dismiss notification or message, subscribe to **(notificationsDismissed)** and **(messagesDismissed)**. 
