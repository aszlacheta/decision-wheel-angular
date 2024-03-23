const spread = 40,
  sizeMin = 3,
  sizeMax = 12 - sizeMin,
  eccentricity = 10,
  deviation = 100,
  dxThetaMin = -0.1,
  dxThetaMax = -dxThetaMin - dxThetaMin,
  dyMin = 0.13,
  dyMax = 0.18,
  dThetaMin = 0.4,
  dThetaMax = 0.7 - dThetaMin;

export default class Confetti {
  timer = undefined;
  frame = undefined;
  confetti: Confetto[] = [];

  container: HTMLElement;
  // @ts-ignore
  colorThemes = [
    () => {
      return this.color(
        (200 * Math.random()) | 0,
        (200 * Math.random()) | 0,
        (200 * Math.random()) | 0
      );
    },
    () => {
      const black = (200 * Math.random()) | 0;
      return this.color(200, black, black);
    },
    () => {
      const black = (200 * Math.random()) | 0;
      return this.color(black, 200, black);
    },
    () => {
      const black = (200 * Math.random()) | 0;
      return this.color(black, black, 200);
    },
    () => {
      return this.color(200, 100, (200 * Math.random()) | 0);
    },
    () => {
      return this.color((200 * Math.random()) | 0, 200, 200);
    },
    () => {
      const black = (256 * Math.random()) | 0;
      return this.color(black, black, black);
    },
    () => {
      return this.colorThemes[Math.random() < 0.5 ? 1 : 2]();
    },
    () => {
      return this.colorThemes[Math.random() < 0.5 ? 3 : 5]();
    },
    // @ts-ignore
    () => {
      return this.colorThemes[Math.random() < 0.5 ? 2 : 4]();
    },
  ];

  constructor() {
    this.container = document.createElement('div');
    this.container.style.position = 'fixed';
    this.container.style.top = '0';
    this.container.style.left = '0';
    this.container.style.width = '100%';
    this.container.style.height = '0';
    this.container.style.overflow = 'visible';
    this.container.style.zIndex = '9999';
  }

  // @ts-ignore
  color(r, g, b) {
    return 'rgb(' + r + ',' + g + ',' + b + ')';
  }

  poof() {
    if (!this.frame) {
      // Append the container
      document.body.appendChild(this.container);
      const that = this;

      // Add confetti
      const theme = this.colorThemes[0];
      (function addConfetto() {
        const confetto = new Confetto(theme);
        that.confetti.push(confetto);
        that.container.appendChild(confetto.outer);
        // @ts-ignore
        that.timer = setTimeout(addConfetto, spread * Math.random());
      })();

      // Start the loop
      // @ts-ignore
      let prev = undefined;

      // @ts-ignore
      const loop = timestamp => {
        // @ts-ignore
        const delta = prev ? timestamp - prev : 0;
        prev = timestamp;
        const height = window.innerHeight;

        for (let i = this.confetti.length - 1; i >= 0; --i) {
          if (this.confetti[i].update(height, delta)) {
            this.container.removeChild(this.confetti[i].outer);
            this.confetti.splice(i, 1);
          }
        }

        if (this.timer || this.confetti.length) {
          // @ts-ignore
          return (this.frame = requestAnimationFrame(loop));
        }

        // Cleanup
        this.stop();
      };
      requestAnimationFrame(loop);
    }
  }

  stop() {
    document.body.removeChild(this.container);
    this.frame = undefined;
  }
}

class Confetto {
  frame;
  outer: HTMLDivElement;
  inner: HTMLDivElement;

  axis;
  theta;
  dTheta;
  x;
  y;
  dx;
  dy;
  // @ts-ignore
  splineX;
  // @ts-ignore
  splineY;

  radius = 1 / eccentricity;
  radius2 = this.radius + this.radius;

  // @ts-ignore
  constructor(theme) {
    this.frame = 0;
    this.outer = document.createElement('div');
    this.inner = document.createElement('div');
    this.outer.appendChild(this.inner);

    const outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.position = 'absolute';
    outerStyle.width = sizeMin + sizeMax * Math.random() + 'px';
    outerStyle.height = sizeMin + sizeMax * Math.random() + 'px';
    innerStyle.width = '100%';
    innerStyle.height = '100%';
    innerStyle.backgroundColor = theme();

    outerStyle.perspective = '50px';
    outerStyle.transform = 'rotate(' + 360 * Math.random() + 'deg)';
    this.axis =
      'rotate3D(' +
      Math.cos(360 * Math.random()) +
      ',' +
      Math.cos(360 * Math.random()) +
      ',0,';
    this.theta = 360 * Math.random();
    this.dTheta = dThetaMin + dThetaMax * Math.random();
    innerStyle.transform = this.axis + this.theta + 'deg)';

    this.x = window.innerWidth * Math.random();
    this.y = -deviation;
    this.dx = Math.sin(dxThetaMin + dxThetaMax * Math.random());
    this.dy = dyMin + dyMax * Math.random();
    outerStyle.left = this.x + 'px';
    outerStyle.top = this.y + 'px';

    // Create the periodic spline
    this.splineX = this.createPoisson();
    this.splineY = [];
    const l = this.splineX.length - 1;
    for (let i = 1, l = this.splineX.length - 1; i < l; ++i)
      this.splineY[i] = deviation * Math.random();
    this.splineY[0] = this.splineY[l] = deviation * Math.random();
  }

  createPoisson() {
    const domain = [this.radius, 1 - this.radius],
      spline = [0, 1];
    let measure = 1 - this.radius2;
    while (measure) {
      let dart = measure * Math.random(),
        i,
        l,
        interval,
        a,
        b,
        c,
        d;

      // Find where dart lies
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2) {
        (a = domain[i]), (b = domain[i + 1]), (interval = b - a);
        if (dart < measure + interval) {
          spline.push((dart += a - measure));
          break;
        }
        measure += interval;
      }
      (c = dart - this.radius), (d = dart + this.radius);

      // Update the domain
      for (i = domain.length - 1; i > 0; i -= 2) {
        (l = i - 1), (a = domain[l]), (b = domain[i]);
        // c---d          c---d  Do nothing
        //   c-----d  c-----d    Move interior
        //   c--------------d    Delete interval
        //         c--d          Split interval
        //       a------b
        if (a >= c && a < d)
          if (b > d)
            domain[l] = d; // Move interior (Left case)
          else domain.splice(l, 2);
        // Delete interval
        else if (a < c && b > c)
          if (b <= d)
            domain[i] = c; // Move interior (Right case)
          else domain.splice(i, 0, c, d); // Split interval
      }

      // Re-measure the domain
      for (i = 0, l = domain.length, measure = 0; i < l; i += 2)
        measure += domain[i + 1] - domain[i];
    }

    return spline.sort();
  }

  // @ts-ignore
  interpolation(a, b, t) {
    return ((1 - Math.cos(Math.PI * t)) / 2) * (b - a) + a;
  }

  // @ts-ignore
  update(height, delta) {
    this.frame += delta;
    this.x += this.dx * delta;
    this.y += this.dy * delta;
    this.theta += this.dTheta * delta;

    // Compute spline and convert to polar
    let phi = (this.frame % 7777) / 7777,
      i = 0,
      j = 1;
    while (phi >= this.splineX[j]) i = j++;
    const rho = this.interpolation(
      this.splineY[i],
      this.splineY[j],
      (phi - this.splineX[i]) / (this.splineX[j] - this.splineX[i])
    );
    phi *= Math.PI * Math.PI;

    const outerStyle = this.outer.style,
      innerStyle = this.inner.style;
    outerStyle.left = this.x + rho * Math.cos(phi) + 'px';
    outerStyle.top = this.y + rho * Math.sin(phi) + 'px';
    innerStyle.transform = this.axis + this.theta + 'deg)';
    return this.y > height + deviation;
  }
}
