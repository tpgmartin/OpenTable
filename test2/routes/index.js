
/*
 * GET home page.
 */
var fs = require('fs');
var path = require('path');


exports.index = function(req, res){
  var restaurant_file = path.resolve(__dirname, '..', 'data') + '/restaurant.json';
  if (fs.existsSync(restaurant_file)) {
    var restaurant = fs.readFileSync(restaurant_file, 'utf-8');    
  }
  res.render('index', { 
    title : 'My Menu Selector',
    restaurant : JSON.parse(restaurant) 
  });
};