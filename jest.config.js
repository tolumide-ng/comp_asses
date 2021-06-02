module.exports = {
    roots: ["<rootDir>/client/src"],
    testMatch: [
        "**/__tests__/**/*.+(ts|tsx|js)",
        "**/?(*.)+(spec|test).+(ts|tsx|js)",
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest",
    },
    // testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    moduleNameMapper: {
        "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
            "<rootDir>/__mocks__/fileMock.js",
        "\\.(css|less|sass|scss)$": "<rootDir>/__mocks__/styleMock.js",
        "^@atoms(.*)$": "<rootDir>/client/src/main/components/UI/atoms/$1",
        "^@molecules(.*)$":
            "<rootDir>/client/src/main/components/UI/molecules/$1",
        "^@organisms(.*)$":
            "<rootDir>/client/src/main/components/UI/organisms/$1",
        "^@templates(.*)$":
            "<rootDir>/client/src/main/components/UI/templates/$1",
        "^@pages(.*)$": "<rootDir>/client/src/main/components/Pages/$1",
        "^@store(.*)$": "<rootDir>/client/src/main/store/$1",
        "^@utils(.*)$": "<rootDir>client/src/main/utilities/$1",
        "^@imgs(.*)$": "<rootDir>/client/src/main/assets/images/$1",
        "^@styles(.*)$": "<rootDir>/client/src/main/assets/styles/$1",
    },
    setupFilesAfterEnv: ["<rootDir>/rtl.setup"],
    // automock: true,
};
