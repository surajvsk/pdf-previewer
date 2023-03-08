const express =  require('express');
const path =  require('path');
const app = express();
const port  = 5000;
const fs =  require('fs');
const { v4: uuidv4 } = require('uuid');
const {fileCopy, createMultiReadStream} = require('./utils/index')
const multi = require('multistream');
app.use(express.json({
    limit: "200mb"
  }));
  app.use(
    express.urlencoded({
      extended: true,
      limit: "200mb",
    })
  );



app.set("views", path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");



app.get('/viewpdf', function(req, res, next){
  let  pdflocation = __dirname+'/public/temp_view/14-to-20-jan-2023.pdf';
  fs.readFile(pdflocation, {encoding: 'base64'}, function read(err, data) {
    if (err) {
        throw err;
    }
    res.json({status:200, file1: data, file2: "file2"})
});

})






app.get('/stream-pdf', function(req, res, next){
  console.log('STREAM API CALL:::::::::::::::::>>>')
  let  pdflocation1 ='C:/Users/SURAJ/Downloads/PDF/public/temp_view/DoctoPdf.pdf';
  let  pdflocation2 ='C:/Users/SURAJ/Downloads/PDF/public/temp_view/14-to-20-jan-2023.pdf';
//   fs.readFile(pdflocation, {encoding: 'base64'}, function read(err, data) {
//     if (err) {
//         throw err;
//     }
//     console.log('data:::::::::::::>>>',data);
//     res.json({status:200, file1: data, file2: "file2"})
// });

// new multi([
//   fs.createReadStream(pdflocation1),
//   fs.createReadStream(pdflocation2)
// ]).pipe(res);

  // var file = fs.createReadStream(pdflocation);
  // var _file = fs.createReadStream(pdflocation);
  // var stat = fs.statSync(pdflocation);
  // var _stat = fs.statSync(pdflocation);
  // res.setHeader('Content-Length', stat.size);
  // res.setHeader('Content-Length', _stat.size);
  // res.setHeader('Content-Type', 'application/pdf');
  // res.setHeader('Content-Disposition', 'attachment; filename=DoctoPdf.pdf');
  // file.pipe(res);
  // _file.pipe(res);

  const files = [pdflocation1, pdflocation2];
const multiStream = createMultiReadStream(files);

console.log('multiStream:::::::::',multiStream)

// multiStream.on('data', (chunk) => {
//   console.log(chunk.toString());
// });

// multiStream.on('end', () => {
//   console.log('All files have been read.');
// });
})


app.post('/view-pdf', async function(req, res, next){
  let temp_folter = `/temp_view/`
  let static_path = __dirname +`/public/` + temp_folter;

  fs.mkdir(static_path, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
});

let username_file = '32200077'+'_'+'2d5250e748d5QpFinal.pdf';
let  pdflocation ="D:/tempQpUpload/template_136/question_paper/268ed0d0-ad13-48d5-a587-2d5250e748d5QpFinal.pdf";
let copypath =  static_path + username_file;
let absolute_path = temp_folter + username_file;

let qp_static = await fileCopy(pdflocation, copypath, absolute_path)
console.log('qp_static::::::::',qp_static)

console.log('REQ:::::::::', req.headers['host'])
res.status(200).json({status:200, qp_path: temp_folter + username_file, hostname: req.headers['host']})
})


app.use('/home', function(req, res, next){
  res.render('home')
})


app.use('/stream', function(req, res, next){
  res.render('stream')
})

app.use('/', function(req, res, next){
    res.render('index')
})



app.listen(port, function(){
    console.log('RUNNING ON PORT NUMBER', port)
})