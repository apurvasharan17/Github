const fs=require('fs').promises;
const path=require('path');
const {v4:uuidv4}=require('uuid');

async function commitRepo(message){
   // console.log("commit is called");
   //specifying paths
   const repoPath=path.resolve(process.cwd(),".ARSgit");
   const stagedPath=path.join(repoPath,"staging");
   const commitPath=path.join(repoPath,"commits");

   try{
    const commitID=uuidv4();
    const commitDir=path.join(commitPath,commitID);
    await fs.mkdir(commitDir,{recursive : true});

    const files=await fs.readdir(stagedPath);//put all files from staging area to commit

    for(const file of files){
        await fs.copyFile(path.join(stagedPath,file),path.join(commitDir,file))
    }

    await fs.writeFile(path.join(commitDir,"commit.json"),JSON.stringify({message,data:new Date().toISOString()}))

    console.log(`Commit ${commitID} created with message:${message}`)
   }   
   
   catch(err){
        console.error("Error cmmiting files:",err);
   }
}
module.exports={commitRepo};