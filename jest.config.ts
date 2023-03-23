import type {Config} from 'jest';
const config: Config = {
    verbose: true,
    moduleNameMapper: {
        "^.+\\.(css|less|scss)$": "babel-jest"
    },
    testEnvironment: "jsdom",
  };

export default config;