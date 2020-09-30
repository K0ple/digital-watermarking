const express = require('express');
const fileUpload = require('express-fileupload');
const dw = require('digital-watermarking');

const app = express();

app.use(fileUpload());

//EnCode Image add digital watermarking
let srcFileName = "pepper.bmp";
let watermarkText = "our-dwm-project";
let fontSize = 1.1;
let enCodeFileName = "enCode.png";
let deCodeFileName = "deCode.png";


// Upload Endpoint
app.post('/upload', (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: 'No file uploaded' });
  }

  const file = req.files.file;

  file.mv(`${__dirname}/client/public/uploads/${file.name}`, err => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({ fileName: file.name, filePath: `/uploads/${file.name}`, dfilePath: `/uploads/${deCodeFileName}` });

    async function run() {
      await dw.transformImageWithText(srcFileName,watermarkText,fontSize,enCodeFileName);
      //DeCode Image get digital watermarking
      let deCodeFileName = "deCode.png";
      await dw.getTextFormImage(enCodeFileName,deCodeFileName);
  }
  run()
  });
});

app.listen(5000, () => console.log('Server Started...'));
