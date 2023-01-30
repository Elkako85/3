const n = 200;
let grid;
let zoom;
let pg;

setup = () => {
  const m = min(windowWidth, windowHeight);
  createCanvas(m, m);
  zoom = n / m;
  pg = createGraphics(n, n);
  grid = new Uint8Array(n * n);
  pg.background(0).pixelDensity(1).loadPixels();
};

draw = () => {
  background(100);
  const mx = 0 | constrain(mouseX * zoom, 0, n - 1);
  const my = 0 | constrain(mouseY * zoom, 0, n - 1);
  mouseIsPressed && (grid[mx + my * n] = 1);

  let next = new Uint8Array(grid);

  for (let y = 4; y < n - 4; y++) {
    for (let x = 4; x < n - 4; x++) {
      const i = x + y * n;
      grid[i] && (pg.pixels[i * 4 + 1] = (pg.pixels[i * 4 + 1] - 2) & 0xff);
      
      const sum0 =
        +grid[i + 1]
        +grid[i - 1]
        +grid[i - n]
        +grid[i + n]
        +grid[i - 1 - n] 
        +grid[i - 1 + n] 
        +grid[i + 1 - n] 
        +grid[i + 1 + n]
 
         +grid[i + 2]
         +grid[i + 2+n]
         +grid[i + 2-n]

         +grid[i - 2]
         +grid[i - 2+n]
         +grid[i - 2-n]
      
         +grid[i + 2*n]
         +grid[i + 2*n-1]
         +grid[i + 2*n+1]

        +grid[i - 2*n]
        +grid[i - 2*n+1]
        +grid[i - 2*n-1]
 
      const sum1 =
        +grid[i+1] 
        +grid[i+2] 
        +grid[i+3] 
        +grid[i+4] 

        +grid[i-1] 
        +grid[i-2] 
        +grid[i-3] 
        +grid[i-4] 

        +grid[i-n] 
        +grid[i-2*n] 
        +grid[i-3*n] 
        +grid[i-4*n] 

        +grid[i+n] 
        +grid[i+2*n] 
        +grid[i+3*n] 
        +grid[i+4*n] 

        +grid[i - n +1] 
        +grid[i - n +2] 
        +grid[i - n +3] 
        +grid[i - n +4]

        +grid[i - 2*n +1] 
        +grid[i - 2*n +2] 
        +grid[i - 2*n +3] 

        +grid[i - 3*n +1] 
        +grid[i - 3*n +2] 
        +grid[i - 4*n +1] 

        +grid[i + n +1] 
        +grid[i + n +2] 
        +grid[i + n +3] 
        +grid[i + n +4]

        +grid[i + 2*n +1] 
        +grid[i + 2*n +2] 
        +grid[i + 2*n +3] 

        +grid[i + 3*n +1] 
        +grid[i + 3*n +2] 

        +grid[i + 4*n +1] 

        +grid[i - n -1] 
        +grid[i - n -2] 
        +grid[i - n -3] 
        +grid[i - n -4]

        +grid[i - 2*n -1] 
        +grid[i - 2*n -2] 
        +grid[i - 2*n -3] 

        +grid[i - 3*n -1] 
        +grid[i - 3*n -2] 

        +grid[i - 4*n -1] 

        +grid[i + n -1] 
        +grid[i + n -2] 
        +grid[i + n -3] 
        +grid[i + n -4]

        +grid[i + 2*n -1] 
        +grid[i + 2*n -2] 
        +grid[i + 2*n -3] 

        +grid[i + 3*n -1] 
        +grid[i + 3*n -2] 

        +grid[i + 4*n -1] ;

      
      let bool;
      if (grid[i] == 0) {
        bool = sum0*2.6 > sum1 ; 
      } else {
        bool = sum0!=sum1
      }
      next[i] = bool;
      pg.pixels[i * 4 + 3] = bool ? 255 : 0;
    }
  }
  grid = next;
  pg.updatePixels();
  image(pg, 0, 0, width, height);
};
