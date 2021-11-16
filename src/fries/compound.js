'use strict';

function compound(r, p = 1 , n = 365, t = 1) {
  return (1 + p * r / (n * t)) ** (n * t) - 1;
}

module.exports = { compound };
