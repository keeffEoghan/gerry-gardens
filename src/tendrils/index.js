/**
 * @todo Bake the noise field into a texture on every resize, if unchanging?
 */

'use strict';

import glContext from 'gl-context';
import FBO from 'gl-fbo';
import Shader from 'gl-shader';
import triangle from 'a-big-triangle';
import throttle from 'lodash.throttle';
import dat from 'dat-gui';
const glslify = require('glslify');

import Particles from './particles';


let settings;

export default (canvas, numBlocks = Math.pow(2, 9)) => {
    const gl = glContext(canvas, {
                alpha: true,
                preserveDrawingBuffer: true
            },
            render);


    let flow = FBO(gl, [1, 1], { float: true });

    let buffers = [FBO(gl, [1, 1], { float: true }), FBO(gl, [1, 1], { float: true })];


    const shape = [numBlocks, numBlocks];

    const particles = Particles(gl, {
            shape: shape,

            // Double the numBlocks of (vertical neighbour) vertices, to have
            // pairs alternating between previous and current state.
            // (Vertical neighbours, because WebGL iterates column-major.)
            geomShape: [shape[0], shape[1]*2],

            logic: glslify('./shaders/logic.frag.glsl'),
            vert: glslify('./shaders/render.vert.glsl'),
            frag: glslify('./shaders/render.frag.glsl')
        });

    const renderShader = particles.render;

    const flowShader = Shader(gl, glslify('./shaders/flow.vert.glsl'),
                glslify('./shaders/flow.frag.glsl'));

    const fadeShader = Shader(gl, glslify('./shaders/triangle.vert.glsl'),
                glslify('./shaders/fade.frag.glsl'));


    let tempPos = [];

    function reset(radius = numBlocks*0.0005, speed = -0.005) {
        particles.populate((u, v, data) => {
            let a = Math.random()*Math.PI*2;
            let l = Math.random();

            tempPos[0] = Math.cos(a)*l;
            tempPos[1] = Math.sin(a)*l;

            // Position
            data[0] = tempPos[0]*radius;
            data[1] = tempPos[1]*radius;


            // Velocity
            data[2] = data[0]*speed;
            data[3] = data[1]*speed;
            // data[2] = (Math.random()-0.5)*speed;
            // data[3] = (Math.random()-0.5)*speed;
        });
    }

    reset();


    const start = Date.now();
    let time = 0;

    function render() {
        if(settings.pause) {
            return;
        }

        const width = gl.drawingBufferWidth;
        const height = gl.drawingBufferHeight;


        // Physics

        // Disabling blending here is important – if it's still enabled your
        // simulation will behave differently to what you'd expect.
        gl.disable(gl.BLEND);

        // Time

        let t0 = time;

        time = Date.now()-start;

        let dt = time-t0;


        let viewSize = [width, height];

        particles.step((uniforms) => Object.assign(uniforms, {
                dt,
                time,
                start,
                flow: flow.color[0].bind(1),
                viewSize
            },
            {
                flowWeight: 500000,
                wanderWeight: 0.0001,
                noiseSpeed: 0.0001,
                damping: 0.975
            },
            settings));

        gl.enable(gl.BLEND);
        gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);


        // Flow FBO and view renders

        gl.viewport(0, 0, width, height);

        let draw = (uniforms) => Object.assign(uniforms, {
                previous: particles.buffers[1].color[0].bind(1),
                resolution: shape,
                viewSize
            });


        // Render to the flow FBO - after the logic render, so particles don't
        // respond to their own flow.

        flow.bind();
        particles.render = flowShader;

        gl.lineWidth(settings.flowWidth);

        particles.draw((uniforms) => Object.assign(uniforms, draw(uniforms), {
                    flowStrength: 0.5
                },
                settings),
            gl.LINES);


        // Render to the view.

        if(settings.fadeOpacity) {
            buffers[0].bind();
        }
        else {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        }

        if(settings.autoClearView) {
            gl.clear(gl.COLOR_BUFFER_BIT);
        }

        if(settings.fadeOpacity) {
            // Copy and fade the last view into the current view.

            fadeShader.bind();

            Object.assign(fadeShader.uniforms, {
                    opacity: settings.fadeOpacity,
                    view: buffers[1].color[0].bind(0),
                    viewSize
                });

            triangle(gl);
        }

        particles.render = renderShader;

        gl.lineWidth(1);

        particles.draw((uniforms) => Object.assign(uniforms, draw(uniforms), {
                    flow: flow.color[0].bind(2),
                    color: [1, 1, 1, 1]
                },
                settings),
            gl.LINES);


        // Copy and fade the view to the screen.

        if(settings.fadeOpacity) {
            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clear(gl.COLOR_BUFFER_BIT);

            fadeShader.bind();

            Object.assign(fadeShader.uniforms, {
                    opacity: 1,
                    view: buffers[0].color[0].bind(0),
                    viewSize
                });

            triangle(gl);


            // Swap buffers.
            stepBuffers();
        }
    }

    function stepBuffers() {
        buffers.unshift(buffers.pop());
    }

    function resize() {
        buffers[0].shape = buffers[1].shape = flow.shape = [
                canvas.width = self.innerWidth,
                canvas.height = self.innerHeight
            ];
    }

    self.addEventListener('resize',
        throttle(resize, 100, { leading: true }), false);

    resize();


    // Settings.

    settings = {
        pause: false,
        autoClearView: false,

        startRadius: 0.01,
        startSpeed: -0.7,

        flowStrength: 0.3,
        flowWidth: 3,

        flowWeight: 0.82,
        wanderWeight: 0.0001,

        noiseSpeed: 0.0002,
        damping: 0.8,

        fadeOpacity: 0,

        clearView: () => {
            buffers.forEach((buffer) => {
                buffer.bind();
                gl.clear(gl.COLOR_BUFFER_BIT);
            });

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        clearFlow: () => {
            flow.bind();
            gl.clear(gl.COLOR_BUFFER_BIT);
        },
        reset,
        restart: () => {
            settings.clearView();
            settings.clearFlow();
            settings.reset(settings.startRadius, settings.startSpeed);
        }
    };

    let gui = new dat.GUI();

    for(let d in settings) {
        gui.add(settings, d);
    }


    // DAT.GUI's color controllers are a bit fucked.

    let temp = { color: [255, 255, 255], opacity: 0.4 };

    function convertColor() {
        settings.color = [
                ...temp.color.slice(0, 3).map((c) => c/255),
                temp.opacity
            ];
    }

    gui.addColor(temp, 'color').onChange(convertColor);
    gui.add(temp, 'opacity').onChange(convertColor);
    convertColor();

    self.settings = settings;
};
