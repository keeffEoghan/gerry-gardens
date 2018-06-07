/**
 * A simple 1D smooth noise function.
 * Adapted from [smooth noise from first principles](http://player.vimeo.com/video/113177168),
 * explored in the [Shadershop intro](http://tobyschachman.com/Shadershop/).
 *
 * The final smooth noise function is defined by the following:
 *     Random = Fract( Sine( x ) * 1000 );
 *     CellNoise = random( Floor( x ) );
 *     SmoothStep = ((x) * (x) * ((x - 1) * -2 + 1));
 *     SmoothSaw = SmoothStep( Fract( x ) );
 *     SmoothNoise = (((CellNoise( x )) * (SmoothSaw( x ))) + ((CellNoise( (x - 1) )) * (SmoothSaw( (x - 1) ) * -1 + 1)));
 */

'use strict';

export let fract = (x) => x-Math.floor(x);

export let random = (x) => fract(Math.sin(x)*1000);

export let cellNoise = (x) => random(Math.floor(x));

export let smoothStep = (x) => x*x*(((x-1)*-2)+1);

export let smoothSaw = (x) => smoothStep(fract(x));

export let smoothNoise = (x) => (cellNoise(x)*smoothSaw(x))+(cellNoise(x-1)*((smoothSaw(x-1)*-1)+1));

export let fractalNoise = (x, octaves = 1) =>
    Array(octaves).fill(0).reduce((sum, v, i) => {
            let n = 1/(i+1);

            return sum+smoothNoise((x/n)*n);
        },
        0);

export default smoothNoise;
