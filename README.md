# Diflexmo Angular Design System

Includes components used in developing Angular Apps for Diflexmo.

[Contribution guide for this project](CONTRIBUTING.md)

## Getting started

### Install NPM package

- `npm i diflexmo-angular-design@prerelease` to install prerelease version
- `npm i diflexmo-angular-design` to install release version

### Setup your application

- Add library providers to application config:
  ```
  export const appConfig: ApplicationConfig = {
    providers: [
      provideRouter(routes),
      provideDesignSystem({ iconConfig: { assetsPath: '{{ your path to assets }}' }}),
      provideHttpClient()
    ]
  };
  ```
- Add assets configuration to `angular.json` assets section:
  ```
  "assets": [
              {
                "glob": "**/*",
                "input": "./node_modules/diflexmo-angular-design/assets",
                "output": "./assets"
              }
    ],
  ```
- Add initialization of theme service to you `app.component.ts` file:

  ```
  export class AppComponent implements OnInit, OnDestroy {
    constructor(private themeService: ThemeService) {}

    ngOnInit(): void {
      this.themeService.init();
    }

    ngOnDestroy(): void {
      this.themeService.destroy();
    }
  }
  ```

- Import any required `diflexmo-angular-design` module into your module/component `imports` section.

## How Tos

### Test library changes locally

If you are working on library changes and want to test them, follow these steps:

- Run the command `ng build --watch` in the root folder of the library
- Navigate to your project and install the library from the folder using the following command:
  `npm i {you path}\diflexmo.angular-design\dist\diflexmo-angular-design`
- In some versions of npm, the peer dependencies of `diflexmo-angular-design` library may not be installed. To solve this issue, you can use `install-local-dependencies` package by running this commands in the project folder:
  ```
  npm i install-local-dependencies -g
  install-local-dependencies
  ```
  After making a change to the library code, you can repeat steps 2 and 3 to install the changes into your project.

### How to override library css variables

If you want to change component background color, text color, etc. you can override the specific **css variable** in body tag:

```css
body {
  --dfm-primary: {{ your new primary color }};
  --dfm-btn-primary-bg: {{ your value }};
}
```

If you override `--dfm-primary` value, it will be replaced everywhere `--dfm-primary` variable is used.

## Components documentation

<details>
<summary>Data table documentation</summary>

### Selector

`dfm-data-table`

### Inputs

data: Of type dfmDataSource, contains items which will contain the actual table data

selectable: boolean, when true will add a column with a checkbox at the beginning of the table. Default= false

rowClickable: boolean, when true the data table will report when a row has been clicked and change the mouse to a pointer. Default= false

headers: an array of DfmTableHeader, to pass the title for each column, if the column can be sortable and if a tooltip should be displayed

stickyActions: boolean, when true will always show the actions column on the write when the table is horizontally scrollable. Default= true

stickyHeader: boolean, when true will always show the header row when table is vertically scrollable. Default= true

stickyFirstColumn: boolean, when true will always the first row of the table when it is horizontally scrollable. Default= true

headerSze: 'lg' | 'md' | 'sm', size of the header. Default= 'lg'

clearSelected$: subject, when passing any value to the subject the table will set all checkboxes to false in the first row when **[rowSelectable]** is set to true

### Outputs

sorted: the datatable will report back which column the user wishes to sort

rowClicked: report of which row was clicked when **[rowClickable]** was set to true

actionClicked: report of which action icon was clicked when **[showActions]** was set to true and at least one item was **[actions]**

selected: report which row had its checkbox value changed

### Example

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

### Truncating data in cells

To have the table truncate data in cells, you have to set the max width of the cell by the using the **[maxWidthStyle]** parameter on **<table-row-cell>**, which takes a css value as input (ie. '120px', or '20vw'). To automatically add a tooltip when a cell is truncated, add the value to appear in the tooltip in the **[fullContent]** parameter. Please be aware that when **[stickyFirstRow]** on the data table is set to true and the table is horizontally scrollable, the maxwidth of that row will always be 33vw, no matter what value is passed in **[maxWidthStyle]**.

</details>

<details>
<summary>Localization</summary>

### How to use

The library uses a combination of the DfmLocalizationService and custom pipes to dynamically change the locale of the app without having to refresh the entire app.

The DfmLocalizationService is used to set the locale of the app. Use the function setCurrentLocale(locale: string) to change the locale. Any locale can be set but it must be registered first, to register a locale refer to the angular documentation.

DfmLocalizationService will get the locale_id to use as the locale on app launch.

The DfmPipesModule will extend the localization pipes native to angular so that they use the locale saved in DfmLocalizationService instead of angular's locale_id. This way developers can keep using the the same pipes angular provides in html.

!important The DfPipesModule must be imported in every module to extend the default pipes. The core module and DesignSystemModule will also take care of this.

</details>

<details>
<summary>Button documentation</summary>

### Selectors

Component: `dfm-button`
Directive: `dfm-button`

### Inputs

color: 'primary' | 'secondary' | 'secondary-gray' | 'tertiary' | 'tertiary-gray' | 'link' | 'link-gray', Sets the style of the button. default: primary
size: 'sm' | 'md' | 'lg' | 'xl' | '2xl', Set the size of the button. Default: lg
disabled: boolean, when sets the button in disabled state
leadingIcon: icon name of the icon that will be shown before button contents.
trailingIcon: icon name of the icon that will be shown after button contents.

### Example

The following code will create a medium sized button with the secondary gray style.

```
<button dfm-button color="secondary-gray" size="md">Click me</button>
```

</details>
