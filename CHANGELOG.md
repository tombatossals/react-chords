## 1.1.0 (October 15, 2025)

### Component

*   Added `Piano.js` component to render piano chord diagrams.
*   Added `ChordBlock.js` wrapper component to display chord diagrams with titles and interactive elements like a play button.

### Example App

*   The example app has been completely overhauled to serve as a full-featured chord browser.
*   Implemented dynamic routing with `react-router-dom` to allow navigation and sharing of specific chords (e.g., `/guitar/C/minor`).
*   Added audio playback functionality for all instruments (Piano, Guitar, Ukulele) using the Web Audio API.
*   Included a real-time search feature to filter chords dynamically.
*   Configured the build process for easy deployment to GitHub Pages.

## 0.2.9 (Aug 17, 2017)

* Dependency on babel-preset-env

## 0.2.8 (Aug 16, 2017)

* Bug fixed

## 0.2.7 (Jun 07, 2017)

### Rendering

* Removed uneeded code

## 0.2.6 (Jun 06, 2017)

### Rendering

* Capo rendered as optional 

## 0.2.5 (Jun 03, 2017)

### Rendering

* Better rendering of barred chords

## 0.2.4 (May 29, 2017)

### Rendering

* Better position of the base fret indicator for ukelele chords

## 0.2.3 (Apr 18, 2017)

### Package

* Fixed a bug with chord finger render

## 0.2.2 (Apr 15, 2017)

### Package

* Bugs solved, updated libraries

## 0.2.1 (Apr 9, 2017)

### Package

* No external dependencies, now react-chords is an isolated component

## 0.2.0 (Apr 9, 2017)

### Package

* Packaged only as a react component, not webapp

## 0.0.15 (Febraury 30, 2017)

### Webapp

* Updated dependencies versions
* Updated react-router syntax with v4 changes

## 0.0.13 (November 30, 2016)

### Backend

* New folder for sitemap and svg chord files.

## 0.0.12 (November 8, 2016)

### Backend

* Generate static SVG chord files.

## 0.0.11 (November 3, 2016)

### Webapp

* Added meta and title headers with react-helmet.

## 0.0.10 (October 30, 2016)

### Webapp

* Render the variations alone in a different page.
* Added google-sites verification file.

## 0.0.9 (October 30, 2016)

### Webapp

* Render new chord format
* Better rendering of text tags

## 0.0.8 (October 29, 2016)

### Webapp

* Better rendering and navigation

## 0.0.7 (October 22, 2016)

### Webapp

* Able to render chords with different strings and frets

## 0.0.6 (October 12, 2016)

### Webapp

* Able to render sharp chords

## 0.0.5 (October 09, 2016)

### Webapp

* Easier and better render of chords with the JSON db-chords

### Webapp

* Better autodetection of barre chords
* Accepts chord without finger information

## 0.0.3 (October 06, 2016)

### Webapp

* React-router navigation
* Automatically detect barre chords

## 0.0.2 (October 03, 2016)

### SVG Chord diagram

* Allow different versions of the same chord.
* Render new chord database schema.
* Render chords with frets highest than the first fret.

## 0.0.1 (October 02, 2016)

### SVG Chord diagram

* First working version.
* Render data from the external dependency of @tombatossals/chords-db
