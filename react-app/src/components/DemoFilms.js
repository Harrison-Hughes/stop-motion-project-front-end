
const bag = (xdim, ydim, color) => [...Array(ydim)].map(() => Array(xdim).fill(color));
let f1 = bag(40, 25, '#00ccff'), f2 = bag(40, 25, '#0099ff'), f3 = bag(40, 25, '#0066ff')
let f4 = bag(40, 25, '#66ff33'), f5 =  bag(40, 25, '#99ff33'), f6 = bag(40, 25, '#ccff33')
let demoFilms = [
  {
    name: 'film1',
    description: 'shades of blue',
    frames: [f1, f2, f3]
  }, 
  {
    name: 'film2',
    description: 'shades of green',
    frames: [f4, f5, f6] 
  }
]



export default demoFilms