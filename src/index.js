/*jshint esversion: 6 */
"use strict";

import {applyConfiguration} from './configurations.js';
import {draw as drawCrossSection} from "./cross-section.js";
import {draw as drawWheelArch} from "./wheel-arch.js";

applyConfiguration();

drawCrossSection();
drawWheelArch();