module.exports = {
    presets: [
      '@babel/preset-env',        // For modern JavaScript features
      '@babel/preset-react',      // For React JSX
      '@babel/preset-typescript', // For TypeScript (if you're using TS)
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./src'],
          alias: {
            '@sentient': './src',
          },
        },
      ],
    ],
  };
  