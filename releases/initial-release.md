# Initial release

The following article contains the initial release migration guides. If you use any version prior 14.20230302.1 please, follow the instructions below to migrate to the latest version.

## Remove isHiddenForMobile from NavigationItem model

From this version, navigation items will be hidden on mobile view dynamically, based on the width of device screen. Because of it, isHiddenForMobile parameter is not supported. If it was used, please, remove it from your NavigationItem objects creation.

## Navigation items updates

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

## Migration from dfm-table component

To migrate from the old dfm-table, change the selector to dfm-data-table then remove the ng-template containing the **<table-header-cell>** tags and pass an array to the **[header]** parameter to show the header row, the items in the array need at least 'id' and 'label' (label will be shown in the row). After this change all **<table-body-cell>** to **<table-row-cell>**.

### Truncating data in cells

To have the table truncate data in cells, you have to set the max width of the cell by the using the **[maxWidthStyle]** parameter on **<table-row-cell>**, which takes a css value as input (ie. '120px', or '20vw'). To automatically add a tooltip when a cell is truncated, add the value to appear in the tooltip in the **[fullContent]** parameter. Please be aware that when **[stickyFirstRow]** on the data table is set to true and the table is horizontally scrollable, the maxwidth of that row will always be 33vw, no matter what value is passed in **[maxWidthStyle]**.
