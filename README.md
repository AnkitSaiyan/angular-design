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

## How Tos

### How to override library variables

Design library provides set of scss variables, which could be imported from `abstracts/variables` and used in components styles. These library variables can be overriden and it will change the way of how library components are rendered.
In order to use base library theme, but change the primary color of it, please, go to `abstracts/_variables.scss` file and add new variable value:

```
$diflexmo-primary: {{your value}};
```

In order to use base library theme, but change some component variables (text color, background color of a component), please, go to `themes/{{your theme}}.scss` and add new value of css variable:

```
@mixin {{your theme mixing name}} {
  --dfm-btn-primary-bg: {{your value}};

  ... // your custom component variables go there
}
```

This works only if the right way of style files import is implemented. As an example of the right import you can refer to this instruction:

1. `abstracts/_variables.scss` file is created. It contains scss variables which you want to override.
2. `styles/_vendors.scss` file is created. It includes css/scss files imports from 3d party libraries. The design library import is added there:

```
@import '../../node_modules/bootstrap/scss/functions';

@import '../../node_modules/diflexmo-angular-design/lib/styles/styles.scss';

@import '../../node_modules/bootstrap/scss/bootstrap.scss';
```

3. The import of the custom `abstracts/_variables.scss` is added **before** the import of `styles/_vendors.scss` in `styles/styles.scss` file. This way the design library can take overriden scss variables and use them in themes:

```
@import './abstracts/variables';

@import './vendors';

@import './themes/theme';
```

## Migrations

<details>
<summary>Migration to new mobile navigation-bar (v. 20231.31.11)</summary>

### Remove isHiddenForMobile from NavigationItem model

From this version, navigation items will be hidden on mobile view dynamically, based on the width of device screen. Because of it, isHiddenForMobile parameter is not supported. If it was used, please, remove it from your NavigationItem objects creation.

</details>

<details>
<summary>Migration to new navigation-bar component (v. 20231.26.23)</summary>

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

</details>
<details>
<summary>Data table documentation (v20231.31.13+)</summary>

### Dfm Data table

Selector: dfm-data-table

### INPUTS
data: Of type dfmDataSource, contains items which will contain the actual table data

selectable: boolean, when true will add a column with a checkbox at the beginning of the table. Default= false

rowClickable: boolean, when true the data table will report when a row has been clicked and change the mouse to a pointer. Default= false

headers: an array of DfmTableHeader, to pass the title for each column, if the column can be sortable and if a tooltip should be displayed

actions: an array of DfmTableAction, this will add a column at the end of the table with a list of clickable icons

showActions: boolean, when true will show the actions column if any actions were passed to the table. Default= true

stickyActions: boolean, when true will always show the actions column on the write when the table is horizontally scrollable. Default= true

stickyHeader: boolean, when true will always show the header row when table is vertically scrollable. Default= true

stickyFirstRow: boolean, when true will always the first row of the table when it is horizontally scrollable. Default= true

headerSze: 'lg' | 'md' | 'sm', size of the header. Default= 'lg'

clearSelected$: subject, when passing any value to the subject the table will set all checkboxes to false in the first row when **[rowSelectable]** is set to true

### OUTPUTS
sorted: the datatable will report back which column the user wishes to sort

rowClicked: report of which row was clicked when **[rowClickable]** was set to true

actionClicked: report of which action icon was clicked when **[showActions]** was set to true and at least one item was **[actions]**

selected: report which row had its checkbox value changed

### MIGRATING FROM DFM-TABLE
To migrate from the old dfm-table, change the selector to dfm-data-table then remove the ng-template containing the **<table-header-cell>** tags and pass an array to the **[header]** parameter to show the header row, the items in the array need at least 'id' and 'label' (label will be shown in the row). After this change all **<table-body-cell>** to **<table-row-cell>**. 

### TRUNCATING DATA IN CELLS
To have the table truncate data in cells, you have to set the max width of the cell by the using the **[maxWidthStyle]** parameter on **<table-row-cell>**, which takes a css value as input (ie. '120px', or '20vw'). To automatically add a tooltip when a cell is truncated, add the value to appear in the tooltip in the **[fullContent]** parameter. Please be aware that when **[stickyFirstRow]** on the data table is set to true and the table is horizontally scrollable, the maxwidth of that row will always be 33vw, no matter what value is passed in **[maxWidthStyle]**.
</details>
