/*jshint esversion: 6 */
"use strict";

import {$} from './util.js';
import {configurations} from "./configurations.js";
import {INCH_MM, MM_PIXELS} from "./math.js";

const canvas = $('wheel-arch');

canvas.height = 500;
canvas.width = 500;

/**
 * @type {RenderingContext}
 */
const ctx = canvas.getContext('2d');

let camber = 1;

export const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    camber = Math.cos(configurations.suspension.camber * Math.PI / 180);

    drawWheel();
    drawTire();
    drawGround();
};

const drawWheel = () => {
    ctx.save();
    ctx.beginPath();

    const radiusMm = (configurations.wheel.diameter * INCH_MM) / 2;
    const radiusPx = radiusMm * MM_PIXELS;

    ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        radiusPx,
        radiusPx * camber,
        0,
        0,
        Math.PI * 2
    );

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
};

const drawTire = () => {
    ctx.save();
    ctx.beginPath();

    const rimRadiusMm = (configurations.wheel.diameter * INCH_MM) / 2;
    const tireThicknessMm = configurations.tire.width * (configurations.tire.aspectRatio / 100);
    const outerRadiusMm = rimRadiusMm + tireThicknessMm;

    const outerRadiusPx = outerRadiusMm * MM_PIXELS;

    ctx.ellipse(
        canvas.width / 2,
        canvas.height / 2,
        outerRadiusPx,
        outerRadiusPx * camber,
        0,
        0,
        Math.PI * 2
    );

    ctx.lineWidth = 1;
    ctx.strokeStyle = 'white';
    ctx.stroke();
    ctx.restore();
};

const drawGround = () => {
    let y = (configurations.wheel.diameter * INCH_MM) / 2;

    y += configurations.tire.width * (configurations.tire.aspectRatio / 100);

    y *= camber;
    y *= MM_PIXELS;

    ctx.strokeStyle = 'gray';
    ctx.lineWidth = 1;

    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2 + y);
    ctx.lineTo(canvas.width, canvas.height / 2 + y);
    ctx.stroke();
};