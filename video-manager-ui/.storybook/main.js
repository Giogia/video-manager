export default {
  stories: [
    "../src/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  staticDirs: [
    "../public"
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/preset-create-react-app",
    "storybook-addon-material-ui",
  ],
  features: {
    interactionsDebugger: true
  },
  docs: {
    autodocs: true
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {}
  }
}