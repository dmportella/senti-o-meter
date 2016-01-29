var bayes = require('bayes')

var classifier = bayes()

// teach it positive phrases

classifier.learn('amazing, awesome movie!! Yeah!! Oh boy.', 'positive')
classifier.learn('Sweet, this is incredibly, amazing, perfect, great!!', 'positive')

// teach it a negative phrase

classifier.learn('terrible, shitty thing. Damn. Sucks!!', 'negative')

// now ask it to categorize a document it has never seen before

classifier.categorize('awesome, cool, amazing!! Yay.')
// => 'positive'

// serialize the classifier's state as a JSON string.
var stateJson = classifier.toJson()

// load the classifier back from its JSON representation.
var revivedClassifier = bayes.fromJson(stateJson)


var fs = require("fs"),
    path = require("path");

var p = "../"
fs.readdir(p, function (err, files) {
    if (err) {
        throw err;
    }

    files.map(function (file) {
        return path.join(p, file);
    }).filter(function (file) {
        return fs.statSync(file).isFile();
    }).forEach(function (file) {
        console.log("%s (%s)", file, path.extname(file));
    });
});