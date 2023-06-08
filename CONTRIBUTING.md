# Contribution guide

This article describes the development flow of `diflexmo-angular-design` library.

## Branching strategy

The branching strategy for this project is built based on [Source code branching guidelines](https://dev.azure.com/diflexmo/Knowledge%20Base/_wiki/wikis/Wiki/402/Source-code-branching-guidelines). The main points from it are described below.

### Main branch

- `diflexmo-angular-design` library should have only one `main` branch, which represents the source of truth and the latest version of the codebase.

- `diflexmo-angular-design` NPM package is published based on the `main` branch state.

### Short-lived branches

- Once a feature is going to be implemented or a bug should be fixed a new **short-lived** branch should be created. 
- The purpose of the branch must be able to be fulfilled by *one or two* persons over a *couple* of days at most.

## Contribution process

### Change requests

1. Feature PR's **should not be created** before the feature is discussed with the team responsible for the repo to ensure that no problems would arise in any other consumer of the library. PR's that add features that were not discussed beforehand will be rejected.
2. Bug fix PR's can be created directly without having to consult with the repo administrator. However, a clear description of the bug and repro steps (if applicable) should be included in the PR in that case.

### Change implementation

1. Create a feature/bugfix branch.
2. Create a PR to merge the short-lived branch into `main`. Describe the puprose of the PR so reviewers can understand it easier and faster.
3. Commit your changes and push them to the branch. 
    * Try to divide your work into commits as much as possible.
    * Try to give your commits representative titles.
4. Keep in mind that it should be a **short-lived** branch. If a feature requires a lot of work to do, try to split it into several PRs.

### Change release

In order to have changes in the release version of the library, the following steps will be performed:
1. Once a PR is merged into `main` branch, a **prerelase** version of the library will be published
    * All new changes will be properly tested
    * Additional changes can be required during prerelease stage
    * Every change should be documented and put into release description
2. Once the library maintainers verify its stability, a **release** version will be published.
