const fs =  require('fs');
const { Readable } = require('stream');
exports.fileCopy = function(pdflocation, copypath, absolute_path) {
    return new Promise((resolved, rejected)=>{
        fs.copyFile(pdflocation, copypath, (error) => {
            if (error) {
             return rejected({
                    msg: error,
                    relative_path: "",
                    absolute_path: "",
                    absolute_path: absolute_path
                 })
            } else {
             // console.log('File has been moved to another folder.')
             return resolved({
                msg: "file has been moved",
                relative_path: copypath,
                absolute_path: pdflocation,
                absolute_path: absolute_path
             })
            }
         })
    })
}


exports.createMultiReadStream = function (files) {
  console.log('files::::::::',files)
    const streams = files.map((file) => fs.createReadStream(file));
    let currentStreamIndex = 0;
  
    console.log('streams::::::::',streams)

    const multiStream = new Readable({
      read() {
        const currentStream = streams[currentStreamIndex];
        if (!currentStream) {
          this.push(null);
          return;
        }
        currentStream.on('end', () => {
          currentStreamIndex++;
          this.read();
        });
        currentStream.pipe(this, { end: false });
      },
    });
  
    return multiStream;
  }