const fs =  require('fs');
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