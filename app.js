const express =require('express');
const morgan =require ('morgan');
const playstore = require('./playstore.js');
const app = express();

app.use(morgan('common'));

app.get('/apps',(req,res) =>{
  const { search = '', sort } = req.query;
  const{filter = '',genres} = req.query;
  if (sort) {
    if (!['Rating', 'App'].includes(sort)) {
      return res
        .status(400)
        .send('Sort must be one of rating or app');
    }
  }

  let results = playstore
    .filter(game =>
      game
        .App
        .toLowerCase()
        .includes(search.toLowerCase()));

  if (sort) {
    results
      .sort((a, b) => {
        return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
      });
     
  }
  res.json(results);
});

  if (genres) {
    if (!['Action', 'Puzzle','Strategy','casual','Arcade','card'].includes(genres)) {
      return res
        .status(400)
        .send('genre must be Action,Puzzle,strategey');
    }
  }
  
  let filterGenres = playstore
    .filter(genres =>
      genres
        .Genres
        .toLowerCase()
        .includes(filter.toLowerCase()));
  
        res.json(filterGenres)
  



app.listen(8000, () => {
  console.log('Server started on PORT 8000');
});