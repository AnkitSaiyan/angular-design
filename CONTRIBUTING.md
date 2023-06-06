# Contribution guide

The following article is going to describe the development flow of diflexmo-angular-design project.

## Branching strategy and PR overview

The brancing strategy for this project is built based on [Source code branching guidelines](https://dev.azure.com/diflexmo/Knowledge%20Base/_wiki/wikis/Wiki/402/Source-code-branching-guidelines). The main points from it will be described below.

The diflexmo-angular-design project has one main branch, which represents the source of truth and the latest version of the codebase. Based on it, `diflexmo-angular-design` NPM package is published. Once a feature should be implemented or a bug should be fixed a new short-term branch should be created. The purpose of the branch must be able to be fulfilled by one or two persons over a couple of days at most.

A PR to main branch should be created when a feature or a bug branch is created. Once a PR is finished, a prerelease version of the library will be published. Once testing has been performed and stability of changes is confirmed, a release version of the library will be generated.

## Changes discussions

1. Bug fix PR's can be created directly without having to consult with the repo administrator. However, a clear description of the bug and repro steps (if applicable) should be included in the PR in that case.
2. Feature PR's **should not be created** before the feature is discussed with the team responsible for the repo to ensure that no problems would arise in any other consumer of the library. PR's that add features that were not discussed beforehand will be rejected.
