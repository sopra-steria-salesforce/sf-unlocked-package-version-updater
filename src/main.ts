/* eslint-disable @typescript-eslint/no-explicit-any */
import * as core from '@actions/core'
import * as fs from 'fs'
import * as path from 'path'

interface PackageDirectory {
  path: string
  versionNumber?: string
  [key: string]: any
}

interface SfdxProjectJson {
  packageDirectories: PackageDirectory[]
  [key: string]: any
}

export async function run(): Promise<void> {
  try {
    const cwd = process.cwd()
    const sfdxJsonPath = path.join(cwd, 'sfdx-project.json')
    const sfdxJson: SfdxProjectJson = JSON.parse(
      fs.readFileSync(sfdxJsonPath, 'utf8')
    )
    // We need all package directories
    const packageDirectories = sfdxJson.packageDirectories

    packageDirectories.forEach((dir) => {
      const versionNumber = dir.versionNumber
      if (!versionNumber) return

      const versionNumberSplit = versionNumber.split('.')
      const minorVersion = versionNumberSplit[1]
      const newMinorVersionNumber = parseInt(minorVersion) + 1
      const newVersionNumber =
        versionNumberSplit[0] +
        '.' +
        newMinorVersionNumber.toString() +
        '.0.NEXT'
      dir.versionNumber = newVersionNumber
    })

    // Writing back potential changes to the sfdx-project.json file...
    fs.writeFileSync(
      sfdxJsonPath,
      JSON.stringify(sfdxJson, null, 4) + '\n',
      'utf8'
    )
  } catch (error: any) {
    core.setFailed(error.message)
  }
}
