// Language Management
let currentLang = localStorage.getItem('language') || 'en';

function toggleLanguage() {
    // Clear all local storage data
    const keysToRemove = ['language'];

    keysToRemove.forEach(key => localStorage.removeItem(key));


    // Switch language
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLang);

    // Apply language settings
    document.documentElement.setAttribute('lang', currentLang);
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.ar;
    });
    document.body.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    const htmlTag = document.documentElement;

    if (currentLang === 'en') {
        htmlTag.setAttribute('lang', 'ar');
        htmlTag.setAttribute('dir', 'rtl');
    } else {
        htmlTag.setAttribute('lang', 'en');
        htmlTag.setAttribute('dir', 'ltr');
    }


    // Update language button text
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'AR' : 'EN';
    }

    // Reload the page to apply changes
    location.reload();
}

// Initialize Language on Page Load
document.addEventListener('DOMContentLoaded', () => {
    document.documentElement.setAttribute('lang', currentLang);
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.ar;
    });
    document.body.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';
    
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'AR' : 'EN';
    }
});

function updateLanguage() {
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.ar;
    });
}



function toggleDetialsLanguage() {
    // Clear all local storage data
    const keysToRemove = ['language'];

    keysToRemove.forEach(key => localStorage.removeItem(key));


    // Switch language
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    localStorage.setItem('language', currentLang);

    // Apply language settings
    document.documentElement.setAttribute('lang', currentLang);
    document.querySelectorAll('[data-en]').forEach(el => {
        el.textContent = currentLang === 'en' ? el.dataset.en : el.dataset.ar;
    });
    document.body.style.direction = currentLang === 'ar' ? 'rtl' : 'ltr';

    const htmlTag = document.documentElement;

    if (currentLang === 'en') {
        htmlTag.setAttribute('lang', 'ar');
        htmlTag.setAttribute('dir', 'rtl');
    } else {
        htmlTag.setAttribute('lang', 'en');
        htmlTag.setAttribute('dir', 'ltr');
    }


    // Update language button text
    const langBtn = document.querySelector('.lang-btn');
    if (langBtn) {
        langBtn.textContent = currentLang === 'en' ? 'AR' : 'EN';
    }

    // Reload the page to apply changes
    location.reload();
}
