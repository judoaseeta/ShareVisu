module.exports = {
  stories: ['../stories/**/*.stories.tsx'],
  addons: ['@storybook/addon-actions', '@storybook/addon-links', '@storybook/addon-controls'],
  webpackFinal: async config => {
    // do mutation to the config

    return config;
  },
};
