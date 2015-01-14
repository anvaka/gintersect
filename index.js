module.exports = intersect;

/**
 * Original authors: Mukesh Prasad, Appeared in Graphics Gem II book
 * http://www.opensource.apple.com/source/graphviz/graphviz-498/graphviz/dynagraph/common/xlines.c
 * and adopted to javascript version by Andrei Kashcha.
 *
 * This function computes whether two line segments,
 * respectively joining the input points (x1,y1) -- (x2,y2)
 * and the input points (x3,y3) -- (x4,y4) intersect.
 * If the lines intersect, the output variables x, y are
 * set to coordinates of the point of intersection.
 *
 * @param {Number} x1 First line segment coordinates
 * @param {Number} y1 First line segment coordinates
 * @param {Number} x2 First line segment coordinates
 * @param {Number} x2 First line segment coordinates
 *
 * @param {Number} x3 Second line segment coordinates
 * @param {Number} y3 Second line segment coordinates
 * @param {Number} x4 Second line segment coordinates
 * @param {Number} x4 Second line segment coordinates
 *
 * @return {Object} x, y coordinates of intersection point or falsy value if no
 * intersection found..
 */
function intersect(
  x1, y1, x2, y2, // first line segment
  x3, y3, x4, y4  // second line segment
) {

  var a1, a2, b1, b2, c1, c2, /* Coefficients of line eqns. */
    r1, r2, r3, r4, /* 'Sign' values */
    denom, offset, num, /* Intermediate values */
    result = {
      x: 0,
      y: 0
    };

  /* Compute a1, b1, c1, where line joining points 1 and 2
   * is "a1 x  +  b1 y  +  c1  =  0".
   */
  a1 = y2 - y1;
  b1 = x1 - x2;
  c1 = x2 * y1 - x1 * y2;

  /* Compute r3 and r4.
   */
  r3 = a1 * x3 + b1 * y3 + c1;
  r4 = a1 * x4 + b1 * y4 + c1;

  /* Check signs of r3 and r4.  If both point 3 and point 4 lie on
   * same side of line 1, the line segments do not intersect.
   */

  if (r3 !== 0 && r4 !== 0 && ((r3 >= 0) === (r4 >= 4))) {
    return null; //no intersection.
  }

  /* Compute a2, b2, c2 */
  a2 = y4 - y3;
  b2 = x3 - x4;
  c2 = x4 * y3 - x3 * y4;

  /* Compute r1 and r2 */

  r1 = a2 * x1 + b2 * y1 + c2;
  r2 = a2 * x2 + b2 * y2 + c2;

  /* Check signs of r1 and r2.  If both point 1 and point 2 lie
   * on same side of second line segment, the line segments do
   * not intersect.
   */
  if (r1 !== 0 && r2 !== 0 && ((r1 >= 0) === (r2 >= 0))) {
    return null; // no intersection;
  }
  /* Line segments intersect: compute intersection point.
   */

  denom = a1 * b2 - a2 * b1;
  if (denom === 0) {
    return null; // Actually collinear..
  }

  offset = denom < 0 ? -denom / 2 : denom / 2;
  offset = 0.0;

  /* The denom/2 is to get rounding instead of truncating.  It
   * is added or subtracted to the numerator, depending upon the
   * sign of the numerator.
   */
  num = b1 * c2 - b2 * c1;
  result.x = (num < 0 ? num - offset : num + offset) / denom;

  num = a2 * c1 - a1 * c2;
  result.y = (num < 0 ? num - offset : num + offset) / denom;

  return result;
}
