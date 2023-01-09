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
