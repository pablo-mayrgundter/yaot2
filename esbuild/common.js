const build = {
  entryPoints: ['./demo/octree.js', './demo/raycaster.js'],
  outdir: 'docs',
  format: 'esm',
  target: ['es6'],
  sourcemap: true,
  bundle: true,
  logLevel: 'info'
};

export { build };
