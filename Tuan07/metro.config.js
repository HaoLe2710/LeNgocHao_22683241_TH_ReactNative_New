const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Enable Expo Router
config.resolver.alias = {
  '@': __dirname,
  '@/assets': `${__dirname}/assets`,
  '@/components': `${__dirname}/components`,
  '@/dtos': `${__dirname}/dtos`,
  '@/screens': `${__dirname}/screens`,
};

module.exports = config;