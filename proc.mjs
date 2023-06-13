import fs from 'node:fs';

var cah = JSON.parse(fs.readFileSync('cah-all-compact.json', 'utf8'));
var main = {
	official: [],
	unofficial: [],
	names: {
		official: [],
		unofficial: []
	}
}
for (var pack of cah.packs) {
	var name = pack.name.replace(/\W/gi, '').toLowerCase() + '.json';
	if (pack.official) {
		main.official.push(name);
		main.names.official.push(pack.name);
	} else {
		main.unofficial.push(name);
		main.names.unofficial.push(pack.name);
	}
	pack.white = pack.white.map(card => cah.white[card]);
	pack.black = pack.black.map(card => cah.black[card]);
	fs.writeFileSync(`packs/${name}`, JSON.stringify(pack));
	console.log(`Wrote pack ${pack.name} to packs/${name}`);
}
fs.writeFileSync('main.json', JSON.stringify(main));