# Contribution guide

The following article is going to describe the development flow of diflexmo-angular-design project.

## Branches overview

The diflexmo-angular-design project has three branches, which are used in pipelines and npm package publishing:

1. `development` branch: the branch is used for development purposes. A new version of `diflexmo-angular-design-dev` package will be published after each commit is pushed.
2. `staging` branch: the branch is used for development and testing purposes. A new prerelease version of `diflexmo-angular-design` package will be published after PR is merged into staging.
3. `main` branch: the branch should have the final version of feature implementation / bug fix. A new version of `diflexmo-angular-design` package will be published after PR is merged into main.

## PR flow overview

1. No PRs are needed in order to push changes to development branch, but they are highly recommended.
2. A change can be merged to staging branch only through the PR. The PR can be made from development or any other branch.
3. A change can be merged to main branch only through the PR. The PR can be made only from staging branch.

## Changes discussions

1. Bug fix PR's can be created directly without having to consult with the repo administrator. However, a clear description of the bug and repro steps (if applicable) should be included in the PR in that case.
2. Feature PR's should not be created before the feature is discussed with the team responsible for the repo to ensure that no problems would arise in any other consumer of the library. PR's that add features that were not discussed beforehand will be rejected.