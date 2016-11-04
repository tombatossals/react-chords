const instrument = [ 'guitar', 'ukelele' ]
const date = new Date().toISOString().substr(0, 10)

console.log('<?xml version="1.0" encoding="UTF-8"?>')
console.log('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')


const generateurl = (url, date) =>
  `<url>
    <loc>https://tombatossals.github.io/react-chords/#/${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `
for (let i of instrument) {
  const instrument = require(`@tombatossals/chords-db/lib/${i}.json`)
  console.log(generateurl(`${i}`, date))

  for (let k of Object.keys(instrument.chords)) {
    console.log(generateurl(`${i}/chords/${k}`, date))
    for (let c of instrument.chords[k]) {
      console.log(generateurl(`${i}/chords/${k.replace('#', 'sharp')}/${c.suffix}`, date))
      for (let v of Object.keys(c.positions)) {
        console.log(generateurl(`${i}/chords/${k.replace('#', 'sharp')}/${c.suffix}/${parseInt(v, 10) + 1}`, date))
      }
    }
  }
}

console.log('</urlset>')
