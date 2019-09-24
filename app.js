const express =require('express');
const morgan =require ('morgan');
const playstore = require('./playstore.js');
const app = express();

app.use(morgan('common'));

app.get('/apps',(req,res) =>{
  const { sort, genres } = req.query;
 
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }
  if (genres) {
    if (!['action', 'puzzle','strategy','casual','arcade','card'].includes(genres.toLowerCase())) {
      return res
        .status(400)
        .send('genre must be Action,Puzzle,strategey');
    }
  }

  let results = playstore
    .filter(game =>
    {
      if(genres) {
        return game.Genres.toLowerCase().includes(genres.toLowerCase());
      } else {
        return true;
      }
    });

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
     
  }
 
  
     
  res.json(results);
});


  
        
  



app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});