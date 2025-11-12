/*jshint esversion: 6 */
"use strict";

export const $ = (id) => document.getElementById(id);
export const ucfirst = (val) => {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
};