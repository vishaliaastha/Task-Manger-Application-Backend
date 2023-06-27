const fs = require('fs');
const path = require('path');
const multer = require('multer')

exports.upload = () => {
    return imageUpload = multer({
        storage : multer.diskStorage({
            destination : function (req, file ,cb){
                const folderName = req.query.folderName;
                // const rootfoldername = path.join(__dirname) 
                console.log(req.body);
                const base = path.join(__dirname,'..')
                const basePath = `${base}/rootfolder/${folderName}/`;

                fs.mkdirSync(basePath , {recursive : true})
                cb(null, basePath)
            },
            filename : function(req,file ,cb){
                cb(null, Date.now() + path.extname(file.originalname))
            }
        
        }),
       
        limits : {fileSize : 10000000},
        fileFilter : function (req,file,cb){
            cb(null,true)
        }
    })
    
}





