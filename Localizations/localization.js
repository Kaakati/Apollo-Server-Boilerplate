const LocalizedStrings = require('LocalizedStrings').default;

// Set default as Arabic.
function getCustomInterfaceLanguage() {
    return "ar-SA";
}

let strings = new LocalizedStrings({
    en: {
        authentizationRequired: "You don't have the required permissions",
        loginRequired: "You must be logged in",
    },
    ar: {
        authentizationRequired: "لا تملك الصلاحيات الكافية",
        loginRequired: "عليك تسجيل الدخول",
    }
}, {
    customLanguageInterface: getCustomInterfaceLanguage
});