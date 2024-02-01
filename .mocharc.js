module.exports = {
    require: ['./test/setup.js', '@babel/register'],
    spec: ['./{,!(node_modules)/**}/*.{test,spec,e2e}.js']
};