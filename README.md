# Conditional File Append

Append text to a file on the condition that a regex isn't matched.


## Usage

    condappend ^regex ./path/to/myfile 'my string'

If `^regex` isn't present then 'my string' will be appended to `myfile`.
