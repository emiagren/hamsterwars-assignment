const getDataBase = require('../database.js');
const db = getDataBase();
const express = require('express');
const router = express.Router();


// GET /matches

	router.get('/', async (req, res) => {

		try {
	
			const matchRef = db.collection('matches');
			const snapshot = await matchRef.get();
		
			if(snapshot.empty) {
				res.send(404).send('Oh no! No matches found.');
				return
			}
		
			matchList = []
			
			snapshot.forEach(doc => {
				const data = doc.data()
				data.id = doc.id
				matchList.push(data)
			})
			res.send(matchList)

		} catch(error) {
			res.status(500).send('Oops! Something went wrong... ' + error.message);
		}
	})
	

// GET /matches/:id

	router.get('/:id', async (req, res) => {

		try {
	
			const id = req.params.id;
			const matchRef = await db.collection('matches').doc(id).get();
		
			if(!matchRef.exists) {
				res.status(404).send(`Oh no! Match with id:${id} does not exist.`);
				return
			}
		
			const data = matchRef.data();
			res.send(data);

		} catch(error) {
			res.status(500).send('Oops! Something went wrong... ' + error.message);
		}
	})

	
// POST /matches

	router.post('/', async (req, res) => {

		try {
	
			const newMatchObject = req.body;
		
			if(!newMatchObject.winnerId || !newMatchObject.loserId) {
				res.sendStatus(400);
				return
			}
		
			const docRef = await db.collection('matches').add(newMatchObject);
			res.send(docRef.id);

		} catch(error) {
			res.status(500).send('Oops! Something went wrong... ' + error.message);
		}	
	})


// DELETE /matches/:id

router.delete('/:id', async (req, res) => {

	try {

		const id = req.params.id;
		const matchRef = await db.collection('matches').doc(id).get();

		if(!id) {
			res.sendStatus(400);
			return;
		}

		if(!matchRef.exists) {
			res.status(404).send('Oh no! Match does not exist.');
			return;
		}

		await db.collection('matches').doc(id).delete();
		res.sendStatus(200);

	} catch(error) {
		res.status(500).send('Oops! Something went wrong... ' + error.message);
	}
})


module.exports = router;	