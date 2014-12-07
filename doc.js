var fs = require('fs');
var marked = require('marked');

var renderer = new marked.Renderer();

renderer.table = function(header, body) {
  return '<table class="pure-table pure-table-horizontal">\n'
    + '<thead>\n'
    + header
    + '</thead>\n'
    + '<tbody>\n'
    + body
    + '</tbody>\n'
    + '</table>\n';
};


marked.setOptions({
  renderer: renderer,
  langPrefix:'',
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  smartypants: false
  
});

function getExtension(filename) {
    console.log();
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}

function cleanName(file){
    file = file.replace('.md','');
    file = file.replace('./','');
    file = file.replace('src/data/','');
    file = file.replace(/[^a-z0-9]/gi,'');
    return file;
}

function filenameToTitle(file){
    file = file.substr(3);
    file = file.replace('.md','');
    file = file.replace('_',' ');
    return file;
}

function getCode(file){
    file = file.replace('.md','.code.md');
    
    if(fs.existsSync(file)){
        
        return marked( fs.readFileSync(file ,'utf8') );
    }
    return '';
    
}

var walk = function(dir) {
    var results = [];
    var list = fs.readdirSync(dir);

    list.forEach(function(filename) {
        var file = dir + '/' + filename,
            stat = fs.statSync(file);

        if(stat && stat.isDirectory()){
            var sections = walk(file);
            console.log(sections);
            var firstSection = sections.shift();

            if(sections.length>0){
                results.push({
                    id: firstSection.id,
                    name: filenameToTitle(filename),
                    intro: firstSection,
                    section: sections
                });
            }

        }
        else{
            console.log('--',filename, /(\.md)/g.test(filename) && !(/(\.code\.md)/g.test(filename)));
            if( /(\.md)/g.test(filename) && !(/(\.code\.md)/g.test(filename))){
                results.push({
                    id: cleanName(file),
                    name: filenameToTitle(filename),
                    content: marked( fs.readFileSync(file ,'utf8') ),
                    code: getCode(file)
                });
            }

            console.log(results);
        }

    });
    return results;

};

module.exports = function(dir){
    return walk(dir);
}
