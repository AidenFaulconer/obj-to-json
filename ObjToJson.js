// learning nodejs
const path = require("path");
const fs = require("fs");

const fileReadDir = path.join("./", "files_to_read");
let hello = "Hello world from nodejs";
const fileToRead = "myoby.obj";
hello = false;

const getFloatsBySpace = /\S[\d\-\.]+/gi; //match anything with whitespace preceeding it that is a number or . or -
const getFileExtension = /\.[\w]+/gi; //match anything with letters preceeded by a .
const getFloatsBySlash = /[\-\.\d]+/gi; //match anything that contains . - or is a number

global.console.log(
  `we are in the file...${path.basename(__filename)}`
); // plucks filename from path
global.console.log(hello || path);
global.console.log(__dirname);
global.console.log(__filename);


let writtenfile = {
  vertexs: [
    // "v1": [
    //         [x,y,z],
    //     ],
  ],
  uvs: [
    // "uv1": [
    //         [x,y],
    //     ],
  ],
  normals: [
    // "n1": [
    //         [x,y,z],
    //     ],
  ],
  face: [
    // "f1": [
    //         [x,y,z],
    //         [x,y,z],
    //         [x,y,z]
    //     ],
  ]
};
// text encoding
let objFile = fs.readFileSync(path.join(fileReadDir, fileToRead), "UTF-8");
ObjToJson(objFile);
//write a json file with nodejs
function ObjToJson(file) {
  let lineStart = 0;
  let lineEnd = 0;
  let thisLine = "";

  let vCount = 0;
  let vtCount = 0;
  let vnCount = 0;
  let fCount = 0;
  for (i = 0; i < file.length; i++) {
    if (file[i] === "\n") {
      lineStart = lineEnd + 1;
      lineEnd = i;
      thisLine = "";
      for (let j = lineStart; j < lineEnd; j++) {
        thisLine += file[j];
      }
      //console.log(thisLine);
      continue;
    } else if (thisLine === '') {
      continue;
    } else if (file[i] + file[i + 1] === "f ") {
      fCount++;
      let vertFace = {};
      vertFace["face "+fCount] = thisLine.match(getFloatsBySlash);
      writtenfile.face.push(vertFace);
      continue;
    } else if (file[i] + file[i + 1] === "v ") {
      vCount++;
      let vert = {};
      vert["vert "+vCount] = thisLine.match(getFloatsBySpace);
      writtenfile.vertexs.push(vert);
      continue;
    } else if (file[i] + file[i + 1] === "vt") {
      vnCount++;
      let uv = {};
      uv["uv "+vnCount] = thisLine.match(getFloatsBySpace);
      writtenfile.uvs.push(uv);
      continue;
    } else if (file[i] + file[i + 1] === "vn") {
      vnCount++;
      let vertNrm = {};
      vertNrm["normal "+vnCount] = thisLine.match(getFloatsBySpace);
      writtenfile.normals.push(vertNrm);
      continue;
    } else {
      thisLine = "";
      continue;
    }
  }
}

// binary encodinig
// fs.readFile(
//   path.join(fileReadDir, 'MKIV.obj'),
//   (err, result) => {
//       console.log(result);
//     }
// );

//write a file in nodejs
fs.writeFile(
  fileToRead.replace(getFileExtension, "") + ".json",
  JSON.stringify(writtenfile),
  err => {
    console.log(err);
  }
);
