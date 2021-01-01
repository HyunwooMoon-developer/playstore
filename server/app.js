/* eslint-disable no-undef */
const express = require('express');
const morgan = require('morgan');
const lists = require('./list');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(morgan('common'));

app.get('/apps' , (req, res) => {
    const {genres = "" , sort} = req.query;
 
    if(sort){
        if(!['rating', 'app'].includes(sort)){
            return res.status(400).send('sort must be one of rating or app')
        }
    }

    if(genres){
        if(!['action', 'puzzle', 'strategy', 'casual', 'arcade', 'card'].includes(genres)){
            return res.status(400).send(`genres must be one of ['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card']`)
        }
    }
   if(!sort){
       return res.status(400).send('please give me the sort');
   }

    
   

   let results = lists.filter((list)=>
                                list.Genres
                                .toLowerCase()
                                .includes(genres.toLowerCase()))
    
   if(sort){
       results
       .sort((current, next) => {
           return current[sort] > next[sort] ? 1:
           current[sort] < next[sort] ? -1 : 0 ;
       })
   }

   res.json(results);
})

module.exports = app;