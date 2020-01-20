
const blankArrayGenerator = (xdim, ydim, color) => [...Array(ydim)].map(() => Array(xdim).fill(color));
let firstFrame = blankArrayGenerator(40, 25, '#FFF')
// let secondFrame = blankArrayGenerator(80, 50, '#bb6e6e')
// let thirdFrame = blankArrayGenerator(80, 50, '#aa7a7a')
let demoFilm = [firstFrame]

export default demoFilm