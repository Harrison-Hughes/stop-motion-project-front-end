
const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(e => Array(xdim).fill(color));
let firstFrame = blankArrayGenerator(50, 30, '#eb4034')
let secondFrame = blankArrayGenerator(50, 30, '#34eb65')
let thirdFrame = blankArrayGenerator(50, 30, '#3459eb')
let demoFilm = [firstFrame, secondFrame, thirdFrame]

export default demoFilm