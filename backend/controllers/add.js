const fs=require("fs").promises;
const path=require("path");

async function add(filePath) {
    //console.log("add command to staging area");
    const repoPath=path.resolve(process.cwd(),".ARSgit");
    const stagingPath=path.join(repoPath,"staging");
    try{
        await fs.mkdir(stagingPath,{recursive:true});
        const fileName=path.basename(filePath);
        await fs.copyFile(filePath,path.join(stagingPath,fileName));
        console.log(`File ${fileName} added to the staging area!`)
    }catch(err){
        console.error("Error adding file :", err);
    }

}
module.exports={add};