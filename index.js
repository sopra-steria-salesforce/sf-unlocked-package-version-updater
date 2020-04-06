const core = require('@actions/core');
const fs = require('fs');
const path = process.cwd();
const sfdxJson = require(path + '/sfdx-project.json');

async function run() {
    try {

        // We need all package directories
        const packageDirectories = sfdxJson.packageDirectories;

        packageDirectories.forEach(dir => {

            const versionNumber = dir.versionNumber;
            const versionNumberSplit = versionNumber.split(".");
            const minorVersion = versionNumberSplit[1];
            const newMinorVersionNumber = parseInt(minorVersion) + 1;
            const newVersionNumber = versionNumberSplit[0] + "." + newMinorVersionNumber.toString() + ".0.NEXT"
            dir.versionNumber = newVersionNumber;
        });

        // Writing back potential changes to the sfdx-project.json file...
        fs.writeFileSync(
            './sfdx-project.json',
            JSON.stringify(sfdxJson, null, 4).concat('\n'),
            'utf8'
        );

        core.setOutput('isSuccess', true);
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();
