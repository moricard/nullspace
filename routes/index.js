
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', 
          { title: 'Express',
            text:  'This is some text to be written...' 
          }
  );
};
