const fs = require('fs')
const path = require('path');


const makeFolder = async (req,res) => {
 const nameOfFolder  = req.body.nameOfFolder;

  fs.mkdir(nameOfFolder, { recursive: true }, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Failed to create folder.');
      return;
    }
  
    res.status(200).send('Folder created successfully.');
  });
}

const makeSubFolder =async (req,res) => {

   
    const { folderName, subfolderName } = req.body;
    
    const folderRootPath = path.join('../Task_Manger/', folderName);
    const subfolderPath = path.join(folderRootPath, subfolderName);
   
    // const subfolderPath = `${folderPath}/${subfolderName}`;
    
    
    fs.mkdir(folderRootPath, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to create folder');
      }
      
      fs.mkdir(subfolderPath, { recursive: true }, (err) => {
        if (err) {
          console.error(err);
          return res.status(500).send('Failed to create subfolder');
        }
        
        res.status(200).send('Folders created successfully');
      });

    });
}


module.exports = { makeFolder,makeSubFolder};