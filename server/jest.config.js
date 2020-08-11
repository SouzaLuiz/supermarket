module.exports = {
  bail: true,
  preset: 'ts-jest',
  clearMocks: true,
  testEnvironment: 'node',
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)'
  ],
  testPathIgnorePatterns: [
    '/node_modules/'
  ]
}
