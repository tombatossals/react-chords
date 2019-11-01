const path = require("path")
exports.createPages = async ({ actions }) => {
  const { createPage } = actions
  // Create pages for each markdown file.
  const instrumentTpl = path.resolve(`src/pages/index.js`)
  const guitar = require(`@tombatossals/chords-db/lib/guitar.json`)
  const ukulele = require(`@tombatossals/chords-db/lib/ukulele.json`)

  const instruments = { guitar: guitar, ukulele: ukulele }

  Object.keys(instruments).forEach(instrument => {
    if (instrument === "guitar") {
      createPage({
        path: `/`,
        component: instrumentTpl,
        context: {
          instrument,
        },
      })
    }
    createPage({
      path: `/${instrument}`,
      component: instrumentTpl,
      context: {
        instrument,
      },
    })

    instruments[instrument].keys.forEach(key => {
      createPage({
        path: `/${instrument}/${key.replace("#", "sharp")}`,
        component: instrumentTpl,
        context: {
          instrument,
          key,
        },
      })

      instruments[instrument].suffixes.forEach(suffix =>
        createPage({
          path: `/${instrument}/${key.replace("#", "sharp")}/${suffix.replace(
            "#",
            "sharp"
          )}`,
          component: instrumentTpl,
          context: {
            instrument,
            key,
            suffix
          },
        })
      )
    })
  })
}
