/*jshint esversion: 6 */
"use strict";

import {$} from './util.js';
import {INCH_MM, MM_PIXELS} from "./math.js";
import {configurations} from "./configurations.js";

const canvas = $('cross-section');

canvas.height = 500;
canvas.width = 500;

const COMPRESSED_SHOCK_LENGTH_INCHES = 15.83;
const STATIC_WHEEL_OFFSET_MM = 50;

/**
 * @type {RenderingContext}
 */
const ctx = canvas.getContext('2d');

const strutMount = {width: 150, height: 20, x: 200, y: -250, angle: 5};
const shockAbsorber = {length: COMPRESSED_SHOCK_LENGTH_INCHES * INCH_MM, width: 50};

export const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.save();

    // Move coordinate system to the center
    ctx.translate(canvas.width / 2, canvas.height / 2);

    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    drawStrutMount();
    drawDamperAssembly();
    drawSteeringKnuckle();
    drawWheel();

    ctx.restore();
};

const drawStrutMount = () => {
    ctx.translate(strutMount.x * MM_PIXELS, strutMount.y * MM_PIXELS);

    ctx.rotate(strutMount.angle * (Math.PI / 180));

    ctx.save();

    ctx.strokeStyle = '#fff';
    ctx.strokeRect(-strutMount.width / 2 * MM_PIXELS, -strutMount.height * MM_PIXELS, strutMount.width * MM_PIXELS, strutMount.height * MM_PIXELS);

    ctx.restore();
};

const drawDamperAssembly = () => {
    ctx.strokeStyle = '#fff';
    ctx.strokeRect(-(shockAbsorber.width / 4) * MM_PIXELS, 0, (shockAbsorber.width / 2) * MM_PIXELS, (shockAbsorber.length / 2) * MM_PIXELS);

    drawSpring(0, 0, (shockAbsorber.length / 2), 30, 40);

    const springPlateWidthMm = 90;
    ctx.strokeRect((-springPlateWidthMm / 2) * MM_PIXELS, (shockAbsorber.length / 2) * MM_PIXELS, springPlateWidthMm * MM_PIXELS, 10 * MM_PIXELS);

    ctx.strokeRect(-(shockAbsorber.width / 2) * MM_PIXELS, ((shockAbsorber.length / 2) + 10) * MM_PIXELS, shockAbsorber.width * MM_PIXELS, ((shockAbsorber.length / 2) - 10) * MM_PIXELS);

    ctx.strokeRect(((-shockAbsorber.width / 2) - 25) * MM_PIXELS, (shockAbsorber.length - 90) * MM_PIXELS, 25 * MM_PIXELS, 80 * MM_PIXELS);
};

const drawSpring = (x, y, length = 200, coils = 20, amplitude = 10) => {
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);

    const step = length / coils;


    for (let i = 0; i <= coils; i++) {
        const dx = x + Math.sin(i) * amplitude * (1 + 0.5 * Math.sin((i / coils) * Math.PI));
        const dy = y + i * step;
        ctx.lineTo(dx * MM_PIXELS, dy * MM_PIXELS);
    }

    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
};

const drawSteeringKnuckle = () => {
    ctx.translate(((-shockAbsorber.width / 2) - 25) * MM_PIXELS, (shockAbsorber.length - 90) * MM_PIXELS);

    ctx.save();

    const connectionLength = 80;
    const connectionDistance = 60;

    ctx.beginPath();
    ctx.lineWidth = 1;
    ctx.moveTo(0, 0);
    ctx.lineTo(0, 80 * MM_PIXELS);
    ctx.lineTo((-connectionDistance + 25) * MM_PIXELS, connectionLength * MM_PIXELS);
    ctx.lineTo(-connectionDistance * MM_PIXELS, connectionLength * MM_PIXELS);
    ctx.lineTo(0, 0);
    ctx.stroke();

    ctx.restore();

    ctx.translate(-connectionDistance * MM_PIXELS, connectionLength * MM_PIXELS);
    ctx.rotate((-strutMount.angle * (Math.PI / 180)));
    ctx.rotate(-configurations.suspension.camber * Math.PI / 180);

    const wheelHubSizeMm = 120;

    ctx.strokeRect(0, 0, 25 * MM_PIXELS, wheelHubSizeMm * MM_PIXELS);

    ctx.translate(0, (wheelHubSizeMm / 2) * MM_PIXELS);
};

const drawWheel = () => {
    ctx.fillStyle = 'white';
    ctx.beginPath();
    ctx.arc(0, 0, 2, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeRect(-configurations.wheel.offset - STATIC_WHEEL_OFFSET_MM * MM_PIXELS, -(configurations.wheel.diameter / 2) * INCH_MM * MM_PIXELS, configurations.wheel.width * INCH_MM * MM_PIXELS, configurations.wheel.diameter * INCH_MM * MM_PIXELS);
};