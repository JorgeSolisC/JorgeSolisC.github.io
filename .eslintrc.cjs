module.exports = {
    ignorePatterns: [],
    env: {
        node: true,
    },
    globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
    },
    extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:vue/vue3-essential'],
    rules: {
        'no-mixed-spaces-and-tabs': ['error', 'smart-tabs'],
        indent: 'off',
        'space-infix-ops': 'error',
        'space-before-blocks': "error",
        'vue/html-indent': [
            'error',
            'tab',
            {
                attribute: 1,
                baseIndent: 1,
                closeBracket: 0,
            },
        ],
        'vue/html-closing-bracket-newline': [
            'error',
            {
                singleline: 'never',
                multiline: 'never',
            },
        ],
        'vue/html-self-closing': [
            'error',
            {
                html: {
                    void: 'always',
                    normal: 'always',
                    component: 'always',
                },
                svg: 'always',
                math: 'always',
            },
        ],
        'vue/max-attributes-per-line': [
            'error',
            {
                singleline: {
                    max: 10,
                },
                multiline: {
                    max: 10,
                },
            },
        ],
        'vue/singleline-html-element-content-newline': 'off',
        'vue/attribute-hyphenation': 'off',
        'vue/no-unused-vars': 'error',
        'no-debugger': 'off',
        'vue/multi-word-component-names': 'off',
        'vue/no-reserved-component-names': 'off'
    },
};