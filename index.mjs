import fs from 'node:fs';
import express from 'express';

const app = express();

app.get('/', (req, res) => {
	res.set('Content-Type', 'text/javascript');
	res.send('const packs = ' + fs.readFileSync('main.json'));
});
app.get('/:file', (req, res) => {
	res.set('Content-Type', 'text/javascript');
	const fname = req.params.file.split('.')[0];
	if (!fs.existsSync(`packs/${req.params.file}`)) res.send(`const ${fname} = null; alert('Error retrieving pack ${fname}');`);
	else res.send(`const ${fname} = ` + fs.readFileSync(`packs/${req.params.file}`));
});

app.listen(80, () => {
	console.log('Server started');
});