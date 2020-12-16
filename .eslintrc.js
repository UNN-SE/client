const realConfig = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'airbnb',
    'airbnb/hooks',
  ],
  globals: {
    Primus: 'readonly',
  },
  rules: {
    indent: [
      'error',
      2,
      {
        ignoredNodes: [
          'TemplateLiteral *',
        ],
        SwitchCase: 1,
      },
    ],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          [
            '@',
            './src/',
          ],
        ],
        extensions: [
          '.ts',
          '.js',
          '.jsx',
          '.json',
        ],
      },
    },
    'import/extensions': [
      '.js',
      '.jsx',
    ],
  },
};

const nopConfig = {
  extends: [
    'plugin:import/warnings',
  ],
  /*

  This config is meant to do nothing.

  It exists because there's no good way to disable ESLint in Create React App:
  https://github.com/facebook/create-react-app/issues/9929

  So the workaround here is to craft a config that does as little as possible,
  and then conditionally use it.

  */

  ignorePatterns: ['**/*.ts', '**/*.tsx', './*.js', 'config/*.js'],
};

module.exports = process.env.DISABLE_ESLINT ? nopConfig : realConfig;
