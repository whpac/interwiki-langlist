namespace Msz2001.InterwikiLanglist {
    type LanguageMap = { [_: string]: string; };

    let langs: LanguageMap = {};

    /**
     * Zwraca polską nazwę języka dla podanego kodu
     * @param code Kod języka
     */
    export function GetLanguageName(code: string) {
        if(langs[code] !== undefined) return langs[code];
        return code;
    }

    /**
     * Pobiera listę języków z serwera lub z pamięci podręcznej
     */
    export function LoadLanguageNames() {
        // 7 dni * 24 godzin * 60 minut * 60 sekund * 1000 ms = 604 800 000
        const CACHE_TIME = 604800000;

        // Spróbuj odczytać języki z pamięci podręcznej
        try {
            let storage = window.localStorage;
            if(storage) {
                let fetchDate = storage.getItem('InterwikiLanglist.languages.fetchDate');
                if(fetchDate) {
                    let now = Date.now();
                    if(now - parseInt(fetchDate) <= CACHE_TIME) {
                        let data = storage.getItem('InterwikiLanglist.languages.list');
                        if(data) {
                            langs = JSON.parse(data);
                            return;
                        }
                    }
                }
            }
        } catch(e) {
            console.warn('[InterwikiLanglist] Error parsing storage data', e);
        }

        let xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            try {
                let data = JSON.parse(xhr.responseText);
                let lang_info = data.query.languageinfo as { [_: string]: { name: string; }; };
                let languages: LanguageMap = {};

                for(let lang_code in lang_info) {
                    // Wikidane używają formatu z _, a API tu zwraca z myślnikiem
                    languages[lang_code.replaceAll('-', '_')] = lang_info[lang_code].name;
                }

                // Zapisz dane do pamięci podręcznej
                try {
                    var storage = window.localStorage;
                    if(storage) {
                        storage.setItem('InterwikiLanglist.languages.fetchDate', Date.now().toString());
                        storage.setItem('InterwikiLanglist.languages.list', JSON.stringify(languages));
                    }
                } catch(e) {
                    console.warn('[InterwikiLanglist] Error saving storage data', e);
                }
                langs = languages;
            } catch(e) {
                console.warn('[InterwikiLanglist] Error loading languages from the server', e);
            }
        });

        xhr.open('GET', 'https://pl.wikipedia.org/w/api.php?action=query&format=json&meta=languageinfo&formatversion=2&liprop=name', true);
        xhr.send();
    }
}