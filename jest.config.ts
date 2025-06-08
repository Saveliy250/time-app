import type { Config } from 'jest';

const config: Config = {
    preset: 'ts-jest',

    testEnvironment: 'jsdom',

    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],

    setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],

    roots: ['<rootDir>/src'],

    testMatch: [
        '<rootDir>/src/**/*.test.(ts|tsx)',
        '<rootDir>/src/**/*.spec.(ts|tsx)',
    ],

    transform: {
        "^.+\\.(ts|tsx)$": [
            "ts-jest",
            {
                // указываем на новый tsconfig для Jest
                tsconfig: "tsconfig.jest.json",
                // отключаем ESM, чтобы import → require
                useESM: false,
                // Если у вас возникнут дополнительные проблемы с JSX,
                // можно оставить эти настройки (они по умолчанию false)
                babelConfig: false,
                isolatedModules: false,
                diagnostics: { warnOnly: true }
            },
        ],
    },

    moduleNameMapper: {
        '^app(.*)$': '<rootDir>/src/app$1',
        '^entities(.*)$': '<rootDir>/src/entities$1',
        '^pages(.*)$': '<rootDir>/src/pages$1',
        '^shared(.*)$': '<rootDir>/src/shared$1',

        // «заглушки» для CSS/SCSS/LESS
        '^.+\\.(css|less|sass|scss)$': 'identity-obj-proxy',

        // (опционально) «заглушки» для картинок/шрифтов
        '^.+\\.(png|jpe?g|gif|svg)$': '<rootDir>/__mocks__/fileMock.js',
    },

    testPathIgnorePatterns: ['/node_modules/', '/dist/'],

    modulePathIgnorePatterns: [],
    moduleDirectories: ['node_modules', 'src'],

};

export default config;
