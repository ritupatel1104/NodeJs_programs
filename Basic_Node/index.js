// const fs = require('node:fs');

//fs = file system
//1) create file
//fs.appendFile(path, data, callBack function)
// fs.appendFile('Hello.txt', "Hello World !!!", (e)=>{
//    if(e) throw error;
//    console.log("Create a hello.txt")
// })

//Issue : If the file already exists, it will append the content to the existing file. So, if you run the above code multiple times, it will keep appending "Hello World!" to the file "hello.txt".


//fs.writeFile(path, data, callback fnc)
// fs.writeFile('Hello.txt', "Hello World !!!", (e)=>{
//    if(e) throw error;
//    console.log("Create a hello.txt")
// })

// Issue : If the file already exists, it will overwrite the existing file. So, if you run the above code multiple times, it will keep overwriting the file "hello.txt" with "Hello World!".



//===============================================================================================================

//create a folder
//fs.mkdir(path, cb fnc)

// fs.mkdir('pages' ,(e)=>{
//     if(e) throw error;
//     console.log("Created a new folder named-->pages");
// })

//create a nested folder
//fs.mkdir(path, {options}, cb fnc)
// fs.mkdir("CSS/Home/Style",{recursive:true}, (e)=>{
//     if (e) throw error;
//     console.log("created a nested folder of CSS")
// })


//=====================================================================================
//read file : used to read content of the file
//fs.readFile(path, fnc(e, data){})
// fs.readFile('hello.txt','utf-8',(e,data)=>{
//     if(e) throw error;
//     console.log(data);
// })



//read folder
//fs.readdir(path, callback function(error, data))
// fs.readdir("CSS", (err, files) => {
//     if (err) throw err;      
//     console.log(files);
// });



//==============================================================================================

//copy file
//fs.copyFile('src path', ' dest path', cb fnc)
// fs.copyFile("hello.txt", "CSS/Home/Style/copy.txt", (err) => {
//     if (err) throw err;      
//     console.log("File copied successfully.")
// });


// rename file :
// 1) rename() method : It is used to rename a file or folder.
// fs.rename(oldPath, newPath, callback function(error))    
// fs.rename("hello.txt", "greet.txt", (err) => {
//     if (err) throw err;      
//     console.log("File renamed successfully.")
// });

//nested file rename
// fs.rename(oldPath, newPath, callback function(error))    
// fs.rename("CSS/Home/Style/copy.txt", "CSS/Home/Style/copy_rename.txt", (err) => {     
//     if (err) throw err;      
//     console.log("Nested file renamed successfully.")
// });


//  rename folder :
// fs.rename(oldPath, newPath, callback function(error))    
// fs.rename("CSS/Home/Style", "CSS/Home/Design", (err) => {     
//     if (err) throw err;      
//     console.log("Folder renamed successfully.")
// });


//=====================================================================================================================
// delete file : there are two methods for deleting file
//1) unlink() method : It is used to delete a file.
// fs.unlink(path, callback function(error))
// fs.unlink("hello_copy.txt", (err) => {
//     if (err) throw err;      
//     console.log("File deleted successfully.")
// });

// 2) rm method : It is used to delete a file or folder.
// fs.rm(path, callback function(error))
// fs.rm("Unusefile.txt", (err) => {
//     if (err) throw err;      
//     console.log("Folder deleted successfully.")
// });


//delete folder (for version 25 or above)
// fs.rm(path, {options}, callback function(error))
// fs.rm("CSS/Home/Design", {recursive: true, force: true}, (err) => {
//     if (err) throw err;      
//     console.log("Folder deleted successfully.")
// });


// Note : if node version is less then 25 then use fs.rmdir() method to delete folder. But if node version is 25 or above then use fs.rm() method to delete folder. Because fs.rmdir() method is deprecated in node version 25 and above.


import chalk from "chalk";

console.log(chalk.blue("Write with chalk"));
console.log(chalk.bgWhite.redBright("Write with chalk"))
console.log(chalk.bgYellow.green.bold("Write with chalk"));



