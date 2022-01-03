import Testing from '@pablo-mayrgundter/testing.js/testing.js';
import createTree from '../index.js';

const tests = new Testing();


tests.add('it can query points', () => {
  const tree = createTree();
  // two points:
  tree.init([
    0, 0, 0,
    10, 0, 0
  ]);

  // sphere at 0, -1, 0 with radius 2
  let matches = tree.intersectSphere(0, -1, 0, 2);
  tests.assertEquals(matches.length, 1, 'Only one point intersects sphere');
  tests.assertEquals(matches[0], 0, 'That point is and index 0');

  matches = tree.intersectSphere(0, -3, 0, 2);
  tests.assertEquals(matches.length, 0, 'There are no points at 0, -3, 0');

  matches = tree.intersectSphere(0, 0, 0, 20);
  tests.assertEquals(matches.length, 2, 'Sphere with r=20 captures all');
  tests.assertEquals(matches[0], 0, 'First point is here');
  tests.assertEquals(matches[1], 3, 'Second point is here');
});

tests.add('it can intersect ray', () => {
  const tree = createTree();
  // two points:
  tree.init([
    0, 0, 0,
    10, 0, 0
  ]);

  const rayOrigin = {
    x: 1, y: 0, z: 0
  };
  const rayDirection = {
    x: -1, y: 0, z: 0
  };
  let matches = tree.intersectRay(rayOrigin, rayDirection)
  tests.assertEquals(matches.length, 2, 'Ray intersects both points');
  tests.assertEquals(matches[0], 0, 'First point is at index 0');
  tests.assertEquals(matches[1], 3, 'Second point is at index 3');

  // Let's shoot at the same direction, but put `near` after the first point:
  let near = 2;
  matches = tree.intersectRay(rayOrigin, rayDirection, near)
  tests.assertEquals(matches.length, 1, 'Ray intersects only one point');
  tests.assertEquals(matches[0], 3, 'That point is at index 3');

  // now let's limit far
  let far = 5;
  matches = tree.intersectRay(rayOrigin, rayDirection, near, far)
  tests.assertEquals(matches.length, 0, 'No points intersect');

  // relax the near and far:
  near = 0.5;
  far = 15;
  matches = tree.intersectRay(rayOrigin, rayDirection, near, far)
  tests.assertEquals(matches.length, 2, 'Ray intersects both points with near and far');
  tests.assertEquals(matches[0], 0, 'First point is at index 0');
  tests.assertEquals(matches[1], 3, 'Second point is at index 3');
});

tests.run();
