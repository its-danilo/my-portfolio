// Language basics shared by server and client code. The provider and hooks
// live in lib/i18n.tsx.

export type Lang = 'en' | 'pt';

// The same content in each language.
export type Localized<T = string> = Record<Lang, T>;

export const STORAGE_KEY = 'lang';

// Runs before the page paints (see app/layout.tsx). It picks the language (the
// visitor's last choice, or else the browser's) and, for Portuguese, hides the
// page until React swaps the English text the server rendered. The timeout
// shows the page anyway if the app never loads.
export const languageScript = `(function(){try{var d=document.documentElement,l=localStorage.getItem('${STORAGE_KEY}');if(l!=='en'&&l!=='pt')l=/^pt\\b/i.test(navigator.language||'')?'pt':'en';d.dataset.lang=l;if(l==='pt'){d.lang='pt-BR';d.classList.add('lang-pending');setTimeout(function(){d.classList.remove('lang-pending')},3000)}}catch(e){}})()`;
