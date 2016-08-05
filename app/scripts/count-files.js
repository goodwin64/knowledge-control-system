const sh = require('shelljs');

/**
 * Counts the number of files in some directory.
 */
function countFiles(folderPath) {
    var count = 0;
    sh.cd(folderPath);
    var files = sh.ls() || [];

    for (var i = 0; i < files.length; i++) {
        if (files[i].match(/.*\..*/)) {
            count++;
        }
    }
    return count;
}

module.exports = countFiles;
