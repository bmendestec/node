import type { Config } from 'jest';
import 'ts-jest';

const config: Config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/__tests__/**/*.test.ts'], // Define onde os testes estarão
  moduleFileExtensions: ["ts", "js"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.(js|ts)$": "$1",
  },
  clearMocks: true,
  setupFiles: ['dotenv/config'], // Carrega variáveis de ambiente
  transform: {
    '^.+//.js$': 'babel-jest'
  }
};

export default config;