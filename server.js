const http = require('http');
// formidableモジュールでファイルのアップロード処理
const formidable = require('formidable');
// filesystemモジュールでコンピューター上のファイルシステムを操作できる
const fs = require('fs');
// nodemailerを使用するとコンピューターから簡単にメールを送信できるようになる
const nodemailer = require('nodemailer');

/* ============================================= 
メール送信
============================================= */
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'waibandl321@gmail.com',
        pass: '@Skyj0725'
    }
});
const mailOption = {
    from: 'waibandl321@gmail.com',
    to: 'waibandl_0412@yahoo.co.jp',
    subject: 'Sending Email using Node.js',
    text: 'That was easy!'
};
transporter.sendMail(mailOption, function(err, info) {
    if(err) {
        console.log(err);
    } else {
        console.log('Email sent: ' + IIRFilterNode.response);
    }
})

/* ============================================= 
ファイルアップロード
============================================= */
http.createServer(function(req, res) {
    if(req.url == '/fileupload') {
        const form = new formidable.IncomingForm();
        form.parse(req, function(err, fields, files) {
            const oldpath = files.filetoupload.path;
            const newPath = '/Users/onishijumpei/code/Node.js/w3c_school/files/' + files.filetoupload.name; // アップする場所
            // 選択したフォルダにファイルを移動
            fs.rename(oldpath, newPath, function(err) {
                if(err) throw err;
                res.write('File uploaded and moved!');
                res.end();
            })
        });
    } else {
        res.writeHead(200, {'Content-Type': 'text/html'});
        res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
        res.write('<input type="file" name="filetoupload"><br>');
        res.write('<input type="submit">');
        res.write('</form>');
        return res.end();
    }
}).listen(8080);