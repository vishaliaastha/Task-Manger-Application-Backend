const fs = require("fs")
const path = require('path')
const folderModel = require('../model/folderModel')

const folderCreateApi = async (req , res) => {
    const foldername= req.body.foldername;
    // if(!foldername){
    //     return res.json({status : 400 , msg : "You are Not Giving Folder name"})
    // }



    const rootFolder = 'rootfolder';
    const folderPath = `${rootFolder}/${foldername}`
    try{

        const path = await folderModel.save({folderPath})
        

        // if(fs.existsSync(rootFolder)){
        //     if(!fs.existsSync(folderPath)){
        //         fs.mkdirSync(folderPath)
        //         return res.json({ status : 200 ,msg :  "Folder Created"})
        //     }
        // }else{
        //     fs.mkdirSync(rootFolder)
        //     if(!fs.existsSync(folderPath)){
        //         fs.mkdirSync(folderPath)
        //         return res.json({ status : 200 ,msg :  "Folder Created"})
        //     }
            
        // }
        return res.status(200).json(path)
        // return res.json({status : 200 , msg : "Folder is allready Presend "} )

    }catch(error){
        console.log(error)
    }

}


const getAllDirectory = async (req ,res) => {
    const rootPath = path.join('rootFolder')
    fs.readdir(rootPath , (err , files) => {
        const folders = files.filter(file => {
            const filePath = path.join(rootPath , file)
            return fs.statSync(filePath)
        })
        if(folders){
            return res.status(200).json({success : folders})
        }
    }) 
    
}








const getAllFiles = async (req ,res) => {
    // const path = req.params.path
    const {path ,filename} = req.query
    
   
    if(path && filename){
        const findFile = await folderModel.find({path : path , filename : filename})
        res.status(200).json({findFile})
    }else{
        
   

    const findFile = await folderModel.find({path})
    

    res.status(200).json({findFile})
    }

   
  
}



module.exports = {folderCreateApi , getAllDirectory , getAllFiles};