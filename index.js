var exec = require('child_process').exec;
var fs = require('fs');

// Discard first two args
var args = process.argv.slice(2);

// Name the arguments for ease of use
var search = args[0];
var file = args[1];
var text = args[2];

// appends the text to the existing file
function appendText(file, text) {
    // If text to be appended isn't supplied
    // warn and exit
    if (typeof text === 'undefined') {
        console.log('No append text specified');
        process.exit(1);
    }

    // Append the text to the file
    fs.appendFile(file, '\n' + text, function (err) {
        if (err) {
            console.log(err);
            process.exit(1);
        }
        // And we're done!
        console.log('"' + text + '" succesfully added to "' + file + '"');
        process.exit();
    });
}

// Check that the file we're looking for
// actually exists
fs.exists(file, function (fileExists) {
    // Warn and exit if file doesn't exist
    if (!fileExists) {
        console.log('File: ' + file + ' doesn\'t exist');
        process.exit();
    } else {
        // Check if the search text is already
        // present in the file
        exec('grep \'' + search + '\' ' + file, function (err, result) {
            // If the search text isn't present
            // append the text to the file
            if (result === '') {
                appendText(file, text);
            } else {
                console.log('\'' + search + '\' is present in \'' + file + '\'');
                process.exit();
            }
        });
    }
});

