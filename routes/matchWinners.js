const getDataBase = require('../database.js');
const db = getDataBase();
const express = require('express');
const router = express.Router();


// GET /matchWinners/:id

router.get('/:id', async (req, res) => {

	try {

		const matchRef = db.collection('matches');
		const hamsterId = req.params.id;
		const snapshot = await matchRef.where('winnerId', '==', hamsterId).get();

		if(snapshot.empty) {
			res.status(404).send('Sorry! This hamster has not won any matches yet.');
			return;
		}

		matchWinners = []

		snapshot.forEach(doc => {
			const data = doc.data();
			data.id = doc.id;
			matchWinners.push(data);
		})

		res.status(200).send(matchWinners);

	} catch(error) {
		res.status(500).send('Oops! Something went wrong... ' + error.message);
	}
});


module.exports = router;