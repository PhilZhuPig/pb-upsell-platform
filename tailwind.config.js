module.exports = {
    important: "#ant-rack-app",
    mode: "jit",
    corePlugins: {
        preflight: false
    },
    purge: [
        "./resources/**/*.blade.php",
        "./resources/**/*.js",
        "./resources/**/*.vue"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {}
    },
    variants: {
        extend: {}
    },
    plugins: [require("@tailwindcss/forms")]
};
