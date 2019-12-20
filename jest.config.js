module.exports = {
    roots: ['<rootDir>/__test__', '<rootDir>/src'],
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Setup Enzyme
    snapshotSerializers: ['enzyme-to-json/serializer'],
    setupTestFrameworkScriptFile: '<rootDir>/__test__/setup/setupEnzyme.tsx',
    testPathIgnorePatterns: ['<rootDir>/__tests__/setup/'],
}
