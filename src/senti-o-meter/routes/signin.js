const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', (req, res) => {
	res.render('signin', { title: 'Express' });
});

module.exports = router;
