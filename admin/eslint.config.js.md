# ESLint Configuration Documentation

[Linked Table of Contents](#linked-table-of-contents)

## 1. Overview

This document details the ESLint configuration used for JavaScript and JSX files within the project.  The configuration is designed to enforce consistent code style, identify potential bugs, and improve overall code quality.  It leverages several popular ESLint plugins to achieve this.

## 2. Configuration Structure

The ESLint configuration is exported as a default array containing a single configuration object. This object defines rules, plugins, and settings for linting `.js` and `.jsx` files.

| Property        | Description                                                                                                        | Value                                                                                       |
|-----------------|--------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------|
| `ignores`       | Specifies directories or files to be excluded from linting.                                                       | `['dist']`                                                                                   |
| `files`          | Specifies the file patterns to lint.                                                                              | `['**/*.{js,jsx}']`                                                                          |
| `languageOptions` | Defines language-specific options for the parser.                                                                  | Object defining `ecmaVersion`, `globals`, and `parserOptions` (detailed below).             |
| `settings`       | Defines project-wide settings used by plugins.                                                                    | `{ react: { version: '18.3' } }`                                                            |
| `plugins`        | Specifies the ESLint plugins to be used, along with their aliases.                                                  | `react`, `react-hooks`, `react-refresh`                                                       |
| `rules`          | Specifies the ESLint rules and their configurations.                                                              | Combination of rules from various recommended configurations and custom overrides (detailed below). |


### 2.1 `languageOptions` Details

The `languageOptions` object provides settings for the ESLint parser:

| Property        | Description                                                                        | Value                               |
|-----------------|------------------------------------------------------------------------------------|---------------------------------------|
| `ecmaVersion`   | Specifies the ECMAScript version to support.                                      | `2020`  (and `'latest'` within `parserOptions`)                               |
| `globals`       | Defines globally available variables.                                             | `globals.browser` (from `globals` package) |
| `parserOptions` | Provides additional options for the parser.                                      | Object defining `ecmaVersion`, `ecmaFeatures`, and `sourceType` (detailed below). |


#### 2.1.1 `parserOptions` Details:

| Property       | Description                                                              | Value             |
|----------------|--------------------------------------------------------------------------|--------------------|
| `ecmaVersion`  | Specifies the ECMAScript version. Uses the latest version. | `'latest'`         |
| `ecmaFeatures` | Enables specific ECMAScript features.                                    | `{ jsx: true }`     |
| `sourceType`    | Specifies the source type ("module" for ES modules).                   | `'module'`         |


### 2.2 `plugins` Details

This configuration uses the following plugins:

*   **`@eslint/js`**:  Provides core ESLint rules for JavaScript.
*   **`eslint-plugin-react`**: Enforces best practices for React code.
*   **`eslint-plugin-react-hooks`**:  Lints React Hooks usage.
*   **`eslint-plugin-react-refresh`**:  Supports the React Fast Refresh feature (if enabled).


### 2.3 `rules` Details

The `rules` object combines rules from various recommended configurations and includes some custom overrides:

*   **`...js.configs.recommended.rules`**: Imports recommended rules from the `@eslint/js` plugin.
*   **`...react.configs.recommended.rules`**: Imports recommended rules from the `eslint-plugin-react` plugin.
*   **`...react.configs['jsx-runtime'].rules`**: Imports rules specifically for using the React JSX transform.
*   **`...reactHooks.configs.recommended.rules`**: Imports recommended rules from the `eslint-plugin-react-hooks` plugin.
*   **`'react/jsx-no-target-blank'`**: Disables the rule that prevents using target="_blank" in JSX, potentially allowing it with appropriate mitigations elsewhere.  Set to `'off'`.
*   **`'react-refresh/only-export-components'`**: Warns if non-component exports are used with React Fast Refresh. Allows constant exports.  This is a warning (`'warn'`) level rule.

## 3. Algorithm Explanation (N/A)

This ESLint configuration doesn't contain any custom algorithms.  It relies on the built-in algorithms of the ESLint engine and the included plugins to perform linting.


<a name="linked-table-of-contents"></a>
## Linked Table of Contents

* [1. Overview](#1-overview)
* [2. Configuration Structure](#2-configuration-structure)
    * [2.1 `languageOptions` Details](#21-languageoptions-details)
        * [2.1.1 `parserOptions` Details:](#211-parseroptions-details)
    * [2.2 `plugins` Details](#22-plugins-details)
    * [2.3 `rules` Details](#23-rules-details)
* [3. Algorithm Explanation (N/A)](#3-algorithm-explanation-na)

