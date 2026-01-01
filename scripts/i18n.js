// Globaal
window.translations = {};
window.currentLang = 'en';

// Haal geneste key op, bv. "header.title"
function getNestedTranslation(obj, key) {
  return key.split('.').reduce((res, k) => (res && res[k] !== undefined ? res[k] : null), obj);
}

// Globale t() functie voor scripts
window.t = function(key) {
  return getNestedTranslation(window.translations, key) || key;
};

// Vervang teksten in HTML
function setLanguage(lang) {
  window.currentLang = lang;
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = getNestedTranslation(window.translations, key) || key;
  });
}

// Detecteer browsertaal
function detectBrowserLanguage() {
  const lang = navigator.language || navigator.userLanguage;
  const shortLang = lang.split('-')[0];
  return ['en','nl'].includes(shortLang) ? shortLang : 'en';
}

// Laad JSON via fetch
function loadTranslations(lang) {
  return fetch(`locales/${lang}.json`)
    .then(res => res.json())
    .then(data => {
      window.translations = data;
      setLanguage(lang);
    })
    .catch(err => console.error("Error loading translations:", err));
}

// Initialisatie
const lang = detectBrowserLanguage();
window.i18nReady = loadTranslations(lang);

// Event listener taal-switcher
document.getElementById('languageSwitcher').addEventListener('change', (e) => {
  loadTranslations(e.target.value);
});
