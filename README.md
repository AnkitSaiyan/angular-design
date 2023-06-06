# Diflexmo Angular Design System

Includes components used in developing Angular Apps for Diflexmo.

[Contribution guide for this project](CONTRIBUTING.md)

## Getting Started

### Install NPM package

1. `npm i diflexmo-angular-design@prerelease` to install prerelease version
2. `npm i diflexmo-angular-design` to install release version

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

### Test library changes locally

To test changes locally, the library needs to be built and installed in an application. The following steps explain the process in detail:
1. Run the command `ng build --watch` in the root folder of the library
2. Navigate to your project and install the library from the folder using the following command:
 `npm i {you path}\diflexmo.angular-design\dist\diflexmo-angular-design`
3. In some versions of npm, the peer dependencies of diflexmo-angular-design library may not be installed. To solve this issue, you can use `install-local-dependencies` package by running this commands in the project folder:
```
npm i install-local-dependencies -g
install-local-dependencies
```
After making a change to the library code, you can repeat steps 2 and 3 to install the changes into your project.

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

## Components documentation

<details>
<summary>Data table documentation</summary>

### Dfm Data table

Selector: dfm-data-table

### INPUTS

data: Of type dfmDataSource, contains items which will contain the actual table data

selectable: boolean, when true will add a column with a checkbox at the beginning of the table. Default= false

rowClickable: boolean, when true the data table will report when a row has been clicked and change the mouse to a pointer. Default= false

headers: an array of DfmTableHeader, to pass the title for each column, if the column can be sortable and if a tooltip should be displayed

stickyActions: boolean, when true will always show the actions column on the write when the table is horizontally scrollable. Default= true

stickyHeader: boolean, when true will always show the header row when table is vertically scrollable. Default= true

stickyFirstColumn: boolean, when true will always the first row of the table when it is horizontally scrollable. Default= true

headerSze: 'lg' | 'md' | 'sm', size of the header. Default= 'lg'

clearSelected$: subject, when passing any value to the subject the table will set all checkboxes to false in the first row when **[rowSelectable]** is set to true

### OUTPUTS

sorted: the datatable will report back which column the user wishes to sort

rowClicked: report of which row was clicked when **[rowClickable]** was set to true

actionClicked: report of which action icon was clicked when **[showActions]** was set to true and at least one item was **[actions]**

selected: report which row had its checkbox value changed

### EXAMPLE

ts-file must contain the following;

```
public tableHeaders: Array<DfmTableHeader> = [
  { title: 'Vessel name', id: 'vesselName' },
  { title: 'Vessel imo', id: 'vesselImo' },
  { title: 'Last update', id: 'lastUpdate' }
];

public datasource: DfmDatasource<number> = { items: [
  {id: 1, name: "test", "imo": "test imo", lastUpdate: new Date()}
  {id: 2, name: "test", "imo": "test imo", lastUpdate: new Date()}
  {id: 3, name: "test", "imo": "test imo", lastUpdate: new Date()}
  {id: 4, name: "test", "imo": "test imo", lastUpdate: new Date()}
]};
```

tableHeaders will be used to render the header of the table while datasource will contain all the data for the body of the table.

The html file will contain the following;

```
<dfm-data-table
  [headers]="tableHeaders"
  [data]="datasource"
  [stickyActions]="true"
>
  <ng-template #bodyRowTemplate let-item>
    <dfm-table-row-cell [maxWidthStyle]="'200px'" [fullContent]="item.vesselName">
      {{ item.name }}
    </dfm-table-row-cell>
    <dfm-table-row-cell>
      {{ item.imo }}
    </dfm-table-row-cell>
    <dfm-table-row-cell>
      {{ item.lastUpdate | date }}
    </dfm-table-row-cell>
    <dfm-data-table-action-cell>
      <ng-template #actionCellTemplate>
        <ng-container *ngIf="item.id === 3">
          <dfm-data-table-action icon="pencil-02" tooltip="test" (click)="test()"></dfm-data-table-action>
        </ng-container>
        <dfm-data-table-action [icon]="item.id === '2' ? 'pencil-02' : 'trash-01'" tooltip="test">
        </dfm-data-table-action>
        <dfm-data-table-action tooltip="test"></dfm-data-table-action>
      </ng-template>
    </dfm-data-table-action-cell>
  </ng-template>
</dfm-data-table>
```

### TRUNCATING DATA IN CELLS

To have the table truncate data in cells, you have to set the max width of the cell by the using the **[maxWidthStyle]** parameter on **<table-row-cell>**, which takes a css value as input (ie. '120px', or '20vw'). To automatically add a tooltip when a cell is truncated, add the value to appear in the tooltip in the **[fullContent]** parameter. Please be aware that when **[stickyFirstRow]** on the data table is set to true and the table is horizontally scrollable, the maxwidth of that row will always be 33vw, no matter what value is passed in **[maxWidthStyle]**.

</details>

<details>
<summary>Localization</summary>

### How to use
The library uses a combination of the DfmLocalizationService and custom pipes to dynamically change the locale of the app without having to refresh the entire app.

The DfmLocalizationService is used to set the locale of the app. Use the function setCurrentLocale(locale: string) to change the locale. Any locale can be set but it must be registered first, to register a locale refer to the angular documentation.
The library will register the following locales automatically:
- nl
- nl-BE
- fr-BE

DfmLocalizationService will get the locale_id to use as the locale on app launch.

The DfmPipesModule will extend the localization pipes native to angular so that they use the locale saved in DfmLocalizationService instead of angular's locale_id. This way developers can keep using the the same pipes angular provides in html.

!important The DfPipesModule must be imported in every module to extend the default pipes. The core module and DesignSystemModule will also take care of this.
</details>

<details>
<summary>Button documentation</summary>

### Dfm Button

Selector: dfm-button
Directive: dfm-button

### INPUTS

color: 'primary' | 'secondary' | 'secondary-gray' | 'tertiary' | 'tertiary-gray' | 'link' | 'link-gray', Sets the style of the button. default: primary
size: 'sm' | 'md' | 'lg' | 'xl' | '2xl', Set the size of the button. Default: lg
disabled: boolean, when sets the button in disabled state
leadingIcon: icon name of the icon that will be shown before button contents.
trailingIcon: icon name of the icon that will be shown after button contents.

### EXAMPLE

The following code will create a medium sized button with the secondary gray style.

```
<button dfm-button color="secondary-gray" size="md">Click me</button>
```

</details>
