# sf-unlocked-package-version-updater

This Github Action is a helper action to update the version number in `sfdx-project.json`. Forked from [navikt/github-action-sfdx-version-updater](https://github.com/navikt/github-action-sfdx-version-updater/tree/master).

## Example

```yml
name: 'Deploy'
on:
  push:
    branches:
      - master
      - main
jobs:
 promote:
    name: Promote
    steps:
      - run: echo 'promoting'

  deploy:
    name: Deploy
    needs: promote
    steps:
      - run: echo 'Deploying'

  update-version-number:
    name: Update Version Number
    needs: promote
    steps:
      - uses: actions/checkout@v4
      - uses: sopra-steria-salesforce/sf-unlocked-package-version-updater@v1
```
