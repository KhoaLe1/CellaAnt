function draw_grid(rctx, rminor, rmajor, rstroke, rfill) {
    rctx.save();
    rctx.strokeStyle = rstroke;
    rctx.fillStyle = rfill;
    let width = rctx.canvas.width;
    let height = rctx.canvas.height;
    for (var ix = 0; ix < width; ix += rminor) {
      rctx.beginPath();
      rctx.moveTo(ix, 0);
      rctx.lineTo(ix, height);
      rctx.lineWidth = (ix % rmajor == 0) ? 0.5 : 0.25;
      rctx.stroke();
      if (ix % rmajor == 0) {
        rctx.fillText(ix / 10, ix, 10);
      }
    }
    for (var iy = 0; iy < height; iy += rminor) {
      rctx.beginPath();
      rctx.moveTo(0, iy);
      rctx.lineTo(width, iy);
      rctx.lineWidth = (iy % rmajor == 0) ? 0.5 : 0.25;
      rctx.stroke();
      if (iy % rmajor == 0) {
        rctx.fillText(iy / 10, 0, iy + 10);
      }
    }
    rctx.restore();
  }
  
  
  var rn = 0;
  //var sane = 0;
  var canvas = document.createElement('canvas');
  canvas.id = 'globalCanvas';
  var context = canvas.getContext('2d');
  document.body.appendChild(canvas);
  
  ant({}, {
    pixlsize: 10,
    interval: 5
  });
  
  function ant(antx, optx) {
  
    var x, y, i;
  
    // extend default opts
    var opts = {
      gridsize: 90,
      pixlsize: 6,
      interval: 5
    };
    for (i in optx) {
      opts[i] = optx[i];
    }
  
    // extend default ants
    var ants = [{
      x: 20,
      y: 20,
      d: 0,
      cD: 0
    }];
    for (i in antx) {
      ants[i] = antx[i];
    }
  
    // initialise grid
    var grid = [];
    for (x = 0; x <= 410; x++) {
      grid[x] = [];
      for (y = 0; y <= 410; y++) {
        grid[x][y] = true;
      }
    }
  
    // initialise directions
    var direcs = [{
        x: 0,
        y: 0
      }, // buffer for direcs[0]
      {
        x: 1,
        y: 0
      },
      {
        x: 0,
        y: -1
      },
      {
        x: -1,
        y: 0
      },
      {
        x: 0,
        y: 1
      }
    ];
  
    // creating canvas
    var canv = document.getElementById('globalCanvas');
    var cont = canv.getContext('2d');
  
    canv.width = 410;
    canv.height = 410;
  
    draw_grid(cont, 10, 50, 'white', 'yellow');
    // initializing pixel colors
  
    var pixlblac = cont.createImageData(opts.pixlsize, opts.pixlsize);
    for (i = 0; i < pixlblac.data.length; i += 4) {
      // i = 0; i < (125) ; i+=4
      pixlblac.data[i + 0] = 0;
      pixlblac.data[i + 1] = 0;
      pixlblac.data[i + 2] = 0;
      pixlblac.data[i + 3] = 255; // data[3] = 255, data[6]
    }
  
    var pixlred = cont.createImageData(opts.pixlsize, opts.pixlsize);
    for (i = 0; i < pixlred.data.length; i += 4) {
      pixlred.data[i + 0] = 255;
      pixlred.data[i + 1] = 0;
      pixlred.data[i + 2] = 0;
      pixlred.data[i + 3] = 255;
    }
    var pixlyellow = cont.createImageData(opts.pixlsize, opts.pixlsize);
    for (i = 0; i < pixlyellow.data.length; i += 4) {
      // i = 0; i < (125) ; i+=4
      pixlyellow.data[i + 0] = 255;
      pixlyellow.data[i + 1] = 255;
      pixlyellow.data[i + 2] = 0;
      pixlyellow.data[i + 3] = 255; // data[3] = 255, data[6]
    }
  
    var pixlblue = cont.createImageData(opts.pixlsize, opts.pixlsize);
    for (i = 0; i < pixlblue.data.length; i += 4) {
      // i = 0; i < (125) ; i+=4
      pixlblue.data[i + 0] = 0;
      pixlblue.data[i + 1] = 0;
      pixlblue.data[i + 2] = 255;
      pixlblue.data[i + 3] = 255; // data[3] = 255, data[6]
    }
  
    // run the ant
    function run_ant() {
      rn++;
      //var sane = true;
      // iterate over ants
      for (i = 0; i < ants.length; i++) {
        var n = ants[i];
        var pixelDA = context.getImageData(n.x * 10, n.y * 10, 1, 1).data;
        // grab pixel Data for every x,y position
        // invert, draw, turn
        if (grid[n.x][n.y] == true) { //if position is true then it is unchanged, assume black
          grid[n.x][n.y] = false; // if state is 0 flip color and change direction
          cont.putImageData(pixlred, (n.x * 10), (n.y * 10));
          //n.d++; // facing west, initial direction + 1
          //if(rn  == 20) {n.cD = 1;}
  
          n.cD++;
          if (n.cD == 1) {
            n.d = 2;
          } else if (n.cD == 2) {
            n.d = 1;
          } else if (n.cD == 3) {
            n.d = 4;
          } else if (n.cD == 4) {
            n.d = 3;
          }
  
        } else if (grid[n.x][n.y] == false) // if false the position has been changed to a diff color
        {
          //  draw_triangle(cont,205,200,200,205,210,205);
          if (pixelDA[0] == 255 && pixelDA[1] == 0 && pixelDA[2] == 0) {
            cont.putImageData(pixlyellow, n.x * 10, n.y * 10);
            //n.d++;
            n.cD++;
            // choosing turns based on direction
            if (n.cD == 1) {
              n.d = 2;
            } else if (n.cD == 2) {
              n.d = 1;
            } else if (n.cD == 3) {
              n.d = 4;
            } else if (n.cD == 4) {
              n.d = 3;
            }
          }
          if (pixelDA[0] == 255 && pixelDA[1] == 255 && pixelDA[2] == 0) {
            cont.putImageData(pixlblue, n.x * 10, n.y * 10);
            //n.d--;
            n.cD++;
            if (n.cD == 1) {
              n.d = 4;
            } else if (n.cD == 2) {
              n.d = 3;
            } else if (n.cD == 3) {
              n.d = 2;
            } else if (n.cD == 4) {
              n.d = 1;
            }
          }
          if (pixelDA[0] == 0 && pixelDA[1] == 0 && pixelDA[2] == 255) {
            cont.putImageData(pixlblac, n.x * 10, n.y * 10);
            n.cD++;
            if (n.cD == 1) {
              n.d = 4;
            } else if (n.cD == 2) {
              n.d = 3;
            } else if (n.cD == 3) {
              n.d = 2;
            } else if (n.cD == 4) {
              n.d = 1;
            }
          } //  if(pixelDA[0] == 0 && pixelDA[0] == 0 && pixelDA[0]){
          //cont.putImageData(pixlred,n.x*10,n.y*10);
          //  }
          //cont.putImageData(pixlred, (n.x * 10) , (n.y * 10));
          //n.d++; //direction
        }
        //cont.putImageData(pixlyellow,0,0);
        // modulus wraparound
        n.cD += 4;
        n.cD %= 4;
  
        if (rn == 19) {
          //temp = n.cD;
          n.d = 2;
          n.cD = 1;
        }
  
        // position + direction
        n.x += direcs[n.d].x; // x += direcs[1].x
        //n.x -= direcs[n.d].x;
        n.y += direcs[n.d].y; // y += direcs[1].y
  
        // sanity check
        if (rn == 1000) {
          sane = false;
          //var pixelData = cont.getImageData(110,210, 1, 1).data;
          //if(pixelData[0] == 255)
          //cont.putImageData(pixlyellow,11,21);
  
        } else sane = true;
      }
  
  
      if (sane == true) {
        //return;
        setTimeout(run_ant, opts.interval);
      }
  
    }
      document.getElementById("demo").addEventListener("click",run_ant);
    //run_ant();
  }
  