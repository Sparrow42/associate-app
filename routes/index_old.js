var express = require('express');
var router = express.Router();
const randomWordWikipedia = require('random-word-wikipedia');

/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

function wrap_randomWordWikipedia(callback){
  randomWordWikipedia('ja').then((value) => {
    console.log('callback1: ', value);
    callback(value);
  })
}

router.get('/', function(req, res, next){ 
  randomWordWikipedia('ja', 1).then((value) => {
    console.log(value);
    console.log('thenの中');
  }); 
  const word = randomWordWikipedia('ja', 1)
  console.log(word)
  var data = {
    theme: word
  }
  res.render('index', data);

});

router.post('/add', (req, res, next) => {
  function callback(param){
    console.log('callback: ', param);
    var ans1 = req.body['ans1'];
    var ans2 = req.body['ans2'];
    var ans3 = req.body['ans3'];
    var data = {
      theme: param,
      ans1: ans1, 
      ans2: ans2, 
      ans3: ans3
    }
    res.render('index', data);
  }
  wrap_randomWordWikipedia(callback);
})

module.exports = router;
