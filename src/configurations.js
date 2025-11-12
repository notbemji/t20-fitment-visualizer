/*jshint esversion: 6 */
"use strict";

import {$, ucfirst} from "./util.js";
import {draw as drawCrossSection} from "./cross-section.js";
import {draw as drawWheelArch} from "./wheel-arch.js";

const wheel = {
    diameter: 16,
    width: 7,
    offset: 35,
};

const tire = {
    width: 205,
    aspectRatio: 50,
};

const suspension = {
    camber: -2,
};

export const configurations = {
    wheel,
    tire,
    suspension,
};

export const applyConfiguration = () => {
    for (const configuration in configurations) {
        if (!configurations.hasOwnProperty(configuration)) {
            continue;
        }

        for (const key in configurations[configuration]) {
            if (!configurations[configuration].hasOwnProperty(key)) {
                continue;
            }

            const value = configurations[configuration][key];
            const element = $(configuration + ucfirst(key));

            if (element) {
                element.value = value;
            }

            element.addEventListener('change', () => updateConfiguration());
        }
    }
};

export const updateConfiguration = () => {
    for (const configuration in configurations) {
        if (!configurations.hasOwnProperty(configuration)) {
            continue;
        }

        for (const key in configurations[configuration]) {
            if (!configurations[configuration].hasOwnProperty(key)) {
                continue;
            }

            const element = $(configuration + ucfirst(key));

            if (element) {
                configurations[configuration][key] = element.value;
            }
        }
    }

    drawCrossSection();
    drawWheelArch();
};