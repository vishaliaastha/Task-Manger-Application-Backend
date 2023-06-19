const fs = require('fs')
const path = require('path');

const makeFolder =async (req,res) => {

    const { folderName } = req.params;
  
    const folderPath = `${folderName}`;
    // const subfolderPath = `${folderPath}/${subfolderName}`;
    
    
    fs.mkdir(folderPath, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Failed to create folder');
      }
      
    //   fs.mkdir(subfolderPath, { recursive: true }, (err) => {
    //     if (err) {
    //       console.error(err);
    //       return res.status(500).send('Failed to create subfolder');
    //     }
        
    //     res.status(200).send('Folders created successfully');
    //   });
    res.status(200).send('Folders created successfully');

    });
}




module.exports = { makeFolder};