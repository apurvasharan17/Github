const yargs=require('yargs');
const {hideBin} = require('yargs/helpers');

const {initRepo}=require("./controllers/init");
const {add}=require("./controllers/add");
const {commitRepo}=require("./controllers/commit");
const {pullRepo}=require("./controllers/pull");
const {pushRepo}=require("./controllers/push");
const {revertRepo}=require("./controllers/revert");

yargs(hideBin(process.argv))
.command('init','Initialise new repository',{},initRepo)
.command('add <file>','add a file to the repository',(yargs)=>{
    yargs.positional("file",{
        describe:"File to add to the staging area",
        type:"string",
    });
},(argv)=>{
    add(argv.file);
})
.command(
    "commit <message>",
    "commit the staged file",
    (yargs)=>{
        yargs.positional("message",{
            describe:"commit message",
            type:"string",
        });
    },(argv)=>{
        commitRepo(argv.message);
    }
).command("push","Push commit to S3",{},pushRepo)
.command("pull","pull commits from S3",{},pullRepo)
.command(
    "revert <commitID>",
    "revert to a specific commit",
    (yargs)=>{
        yargs.positional("commitID",{
            describe:"Commit ID to revert to",
            type:"string",
        })
    },revertRepo
)
.demandCommand(1,"You need at least one command").help().argv;

