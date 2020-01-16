
const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(e => Array(xdim).fill(color));
let firstFrame = blankArrayGenerator(80, 50, '#FFF')
let secondFrame = blankArrayGenerator(80, 50, 'grey')
let thirdFrame = blankArrayGenerator(80, 50, 'black')
let demoFilm = [firstFrame, secondFrame, thirdFrame]

export default demoFilm