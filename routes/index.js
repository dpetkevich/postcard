
/*
 * GET home page.
 */

exports.index = function(req, res){
  
 // cl  client.convertHtml('<html>hello world</html>', pdf.saveToFile("google_com.pdf"))
client.convertHtml('<html>hello world</html>', pdf.saveToFile("google_com.pdf"));
  res.render('index', { title: 'Express' });
};

// 