const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const hamsters = require('./routes/hamsters.js');
const matches = require('./routes/matches.js');
const losers = require('./routes/losers.js');
const winners = require('./routes/winners.js');
const matchWinners = require('./routes/matchWinners.js');


const PORT = process.env.PORT || 1335
const staticFolder = path.join(__dirname, 'static');
const imgFolder = path.join(__dirname, 'img');


// Middleware

app.use((req, res, next) => {
	console.log(`${req.method} ${req.url}`, req.params);
	next();
})

app.use( express.json() );
app.use( cors() );
app.use( express.static(staticFolder) );
app.use( express.static(imgFolder) );


// REST API for /hamsters && /matches
app.use('/hamsters', hamsters);
app.use('/matches', matches);
app.use('/losers', losers);
app.use('/winners', winners);
app.use('/matchWinners', matchWinners);


// Start server
app.listen(PORT, () => {
	console.log('Server listening on port ' + PORT);
})