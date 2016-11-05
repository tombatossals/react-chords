import fs from 'fs'
import path from 'path'

const instrument = [ 'guitar', 'ukelele' ]
const date = new Date().toISOString().substr(0, 10)

const writeline = line =>
  fs.appendFileSync(path.join(__dirname, '..', 'build', 'static', 'sitemap.xml'), line)

const generateurl = (url, date) =>
  `<url>
    <loc>https://tombatossals.github.io/react-chords/?p=/${url}</loc>
    <lastmod>${date}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  `

writeline('<?xml version="1.0" encoding="UTF-8"?>')
writeline('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">')

for (let i of instrument) {
  const instrument = require(`@tombatossals/chords-db/lib/${i}.json`)
  writeline(generateurl(`${i}`, date))

  for (let k of Object.keys(instrument.chords)) {
    writeline(generateurl(`${i}/chords/${k}`, date))
    for (let c of instrument.chords[k]) {
      writeline(generateurl(`${i}/chords/${k.replace('#', 'sharp')}/${c.suffix}`, date))
      for (let v of Object.keys(c.positions)) {
        writeline(generateurl(`${i}/chords/${k.replace('#', 'sharp')}/${c.suffix}/${parseInt(v, 10) + 1}`, date))
      }
    }
  }
}

writeline('</urlset>')
