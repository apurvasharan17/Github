const fs=require('fs').promises; //fs:-file system
const path=require('path');
async function initRepo(){
 //console.log("init command called");
const repoPath=path.resolve(process.cwd(),".ARSgit");
const commitsPath=path.join(repoPath,"commits");

try{
    await fs.mkdir(repoPath,{resursive :true});//recursive:- to create nested folders
    await fs.mkdir(commitsPath,{resursive :true});
    await fs.writeFile(
        path.join(repoPath,"config.json"),
        JSON.stringify({bucket:process.env.S3_BUCKET})
    );
    console.log("Repository initialised!");
}catch(err){
    console.error("Error initialising the repository");
}
}
module.exports={initRepo};