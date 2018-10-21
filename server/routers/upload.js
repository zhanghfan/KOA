var formParse = require('co-busboy')
var fs = require('fs');
var path = require('path');

exports.post = function *(){
  var parts = formParse(this.request)
  var part;
  var fileNames = []
  while (part = yield parts){
    var filename = part.filename
    fileNames.push(filename)
    var homeDir = path.resolve(__dirname, '..')
    var newpath = homeDir + '/static/'+ filename;
    var stream = fs.createWriteStream(newpath);
    part.pipe(stream);
  }
  if(fileNames.length > 0){
    console.log('fileNames',fileNames)
    var imgUrls = [];
    for (var item of fileNames){
      imgUrls.push('http://localhost:8000/' + item)
    }
    this.body = {
      code:0,
      message:'上传成功',
      result:{
        urls:imgUrls
      }
    }
  }
}