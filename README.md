# sfdx-version-updater

This Github Action is a helper action to update the version number in `sfdx-project.json`. Forked from [muenzpraeger/github-action-sfdx-packaging-updater](https://github.com/muenzpraeger/github-action-sfdx-packaging-updater). All credits goes to muenzpraeger. Only minor modifications are made in this repo.

## Outputs

This action provides one output:

-   `isSuccess` - true if the result status code equals 0.

## Example

```yml
# Update sfdx-project.json version number (e.g., 0.9.0.NEXT to 0.10.0.NEXT)
- name: 'Extract package:version:create result data'
  id: version-updater
  uses: navikt/github-action-sfdx-version-updater
```
