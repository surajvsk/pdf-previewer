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







app.get('/view-pdf/:id/:type', function(req, res, next){
  const {id, type} = {
    ...req.body,
    ...req.body,
    ...req.params
  }


  console.log('HERE::::::>>', id, type)

  let  pdflocation = "";// __dirname+'/public/temp_view/14-to-20-jan-2023.pdf';


  if(type=="QPaper"){
    pdflocation = __dirname+'/public/temp_view/14-to-20-jan-2023.pdf';
  }else{
    pdflocation = __dirname+'/public/temp_view/DoctoPdf.pdf';
  }


  var file = fs.createReadStream(pdflocation);
  var stat = fs.statSync(pdflocation);
  res.setHeader('Content-Length', stat.size);
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', 'attachment; filename=14-to-20-jan-2023.pdf');
  file.pipe(res);
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