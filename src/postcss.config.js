function parseNum (str) {
  const start = str.indexOf(':') + 1,
        end = str.indexOf('px'),
        num = str.slice(start, end)

  return parseInt(num, 10)
}

module.exports = {
  map: false,
  plugins: {
    'postcss-flexbugs-fixes': {},
    'postcss-mq-keyframes': {},
    'css-mqpacker': {
      sort: (a, b) => {
        const aNum = parseNum(a),
              bNum = parseNum(b)

        return bNum - aNum
      }
    },
    'autoprefixer': {
      browsers: ['> 2%', 'last 6 versions', 'not ie <= 11'],
      cascade: false,
      flexbox: 'no-2009'
    },
    'postcss-csso': {
      restructure: true,
      sourceMap: false,
      usage: null,
      comments: 'none'
    }
  }
}