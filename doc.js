var fs = require('fs');
var markdown = require('markdown').markdown;

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);

    list.forEach(function(filename) {
        var file = dir + '/' + filename,
            stat = fs.statSync(file);

        if(stat && stat.isDirectory()){
            var nameFolder = filename;

            if(fs.existsSync(file + '/name')){
                nameFolder = fs.readFileSync(file + '/name','utf8');
            }
            
            var sections = walk(file);

            
            if(sections.length>0){
                results.push({
                    id: file,
                    name: nameFolder,
                    intro: sections.shift(),
                    section: sections
                });
            }

        }
        else{
            
            if(getExtension(filename) == '.md'){
                results.push({
                    id: file,
                    name: filename,
                    content: markdown.toHTML( fs.readFileSync(file ,'utf8') ),
                    code: 'content-type: application/json; charset=utf-8'
                });
            }
        }

    });
    return results;

};

module.exports = function(dir){
    return walk(dir);
}
