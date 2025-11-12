/*jshint esversion: 6 */
"use strict";

import {$} from './util.js';
import {configurations} from "./configurations.js";

const canvas = $('cross-section');

canvas.height = 500;
canvas.width = 500;

/**
 * @type {RenderingContext}
 */
const ctx = canvas.getContext('2d');

export const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);


};

const drawWheel = () => {

};