
const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(e => Array(xdim).fill(color));
let firstFrame = blankArrayGenerator(80, 50, '#eb4034')
let secondFrame = blankArrayGenerator(80, 50, '#34eb65')
let thirdFrame = blankArrayGenerator(80, 50, '#3459eb')
let demoFilm = [firstFrame, secondFrame, thirdFrame]

export default demoFilm