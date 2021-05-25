const getDataBase = require('../database.js');
const db = getDataBase();
const express = require('express');
const router = express.Router();


// GET /winners

router.get('/', async (req, res) => {

	try {

		const hamstersRef = db.collection('hamsters');
		const snapshot = await hamstersRef.orderBy('wins', 'desc').limit(5).get();

		winnerList = []

		snapshot.forEach(doc => {
			const data = doc.data();
			winnerList.push(data);
		})
		res.send(winnerList)

	} catch(error) {
		res.status(500).send('Oops! Something went wrong... ' + error.message);
	}
});

module.exports = router;