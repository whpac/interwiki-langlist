namespace Msz2001.InterwikiLanglist {

    type ProcessedSitelink = {
        Title: string;
        LanguageCode: string;
        LanguageName: string;
        IsRecommended: boolean;
        Badge: Badge;
    };

    /** Klasa zarządzająca zawartością listy języków */
    export class LangListView {
        protected WikidataLink: HTMLAnchorElement;
        protected LanguagesList: HTMLElement;
        protected NoLinks: HTMLElement;
        protected Loading: HTMLElement;
        protected LoadingError: HTMLElement;
        protected CreateArticleWrapper: HTMLElement;
        protected CreateButton: HTMLAnchorElement;
        protected CreateArticleUrl: string | undefined;

        public constructor(wrapper: HTMLElement) {
            this.CreateArticleWrapper = document.createElement('div');
            this.CreateArticleWrapper.classList.add('create-wrapper');
            this.CreateArticleWrapper.textContent = 'Tego artykułu nie ma jeszcze w polskojęzycznej Wikipedii. Możesz go utworzyć.';
            wrapper.appendChild(this.CreateArticleWrapper);

            this.CreateButton = document.createElement('a');
            this.CreateButton.classList.add('mw-ui-button', 'mw-ui-progressive');
            this.CreateButton.textContent = 'Utwórz stronę';
            this.CreateArticleWrapper.appendChild(this.CreateButton);

            let header = document.createElement('header');
            header.textContent = 'Dostępne języki';
            wrapper.appendChild(header);

            this.LanguagesList = document.createElement('ul');
            wrapper.appendChild(this.LanguagesList);

            this.NoLinks = document.createElement('div');
            this.NoLinks.classList.add('notice');
            this.NoLinks.textContent = 'Ten artykuł nie istnieje jeszcze w żadnym języku';
            wrapper.appendChild(this.NoLinks);

            this.Loading = document.createElement('div');
            this.Loading.classList.add('notice');
            this.Loading.textContent = 'Wczytywanie...';
            wrapper.appendChild(this.Loading);

            this.LoadingError = document.createElement('div');
            this.LoadingError.classList.add('notice');
            this.LoadingError.textContent = 'Nie udało się wczytać listy języków';
            wrapper.appendChild(this.LoadingError);

            let footer = document.createElement('footer');
            footer.textContent = 'Pobrano z ';
            wrapper.appendChild(footer);

            this.WikidataLink = document.createElement('a');
            this.WikidataLink.textContent = 'elementu Wikidanych';
            this.WikidataLink.href = 'https://wikidata.org';
            this.WikidataLink.addEventListener('keydown', ((e: KeyboardEvent) => {
                // Po naciśnięciu klawisza Tab, przejdź do pierwszego linku
                if(e.code == 'Tab' && !e.shiftKey) {
                    this.FocusFirstLink();
                    e.preventDefault();
                }
            }).bind(this));
            footer.appendChild(this.WikidataLink);

            wrapper.addEventListener('keydown', ((e: KeyboardEvent) => {
                // Po naciśnięciu klawisza Shift+Tab, przejdź do ostatniego linku
                if(e.code == 'Tab' && e.shiftKey) {
                    this.MoveFocusToEndIfNeeded(e);
                }
            }).bind(this));

            this.PrepareForNextDisplay();
        }

        /**
         * Ustawia link do powiązanego elementu Wikidanych
         * @param q_id Identyfikator elementu Wikidanych
         */
        public SetWikidataElement(q_id: string) {
            this.WikidataLink.href = `https://www.wikidata.org/wiki/Special:EntityData/${q_id}`;
        }

        /**
         * Ustawia adres docelowy przycisku "Utwórz stronę"
         * @param url Adres URL, prowadzący do strony tworzenia artykułu
         */
        public SetCreateUrl(url: string | undefined) {
            this.CreateButton.href = url ?? '#';

            if(url === undefined) {
                this.CreateArticleWrapper.style.display = 'none';
            } else {
                this.CreateArticleWrapper.style.display = '';
            }
        }

        /**
         * Wypełnia listę linków do wersji językowych
         * @param sitelinks Tablica linków do innych wersji językowych
         */
        public PopulateLanguagesList(sitelinks: Sitelink[]) {
            this.LanguagesList.innerText = '';

            let processed_links = this.SortAndFilterLinks(sitelinks);
            let hidden_li: HTMLElement[] = [];
            for(let sitelink of processed_links) {
                let li = document.createElement('li');
                li.innerHTML = `<a href="${this.BuildUrl(sitelink)}">${sitelink.LanguageName}</a>`;

                let badge_title = '';
                switch(sitelink.Badge) {
                    case Badge.AnM:
                        li.classList.add('badge-anm');
                        badge_title = ' – artykuł na medal';
                        break;
                    case Badge.LnM:
                        li.classList.add('badge-lnm');
                        badge_title = ' – lista na medal';
                        break;
                    case Badge.DA:
                        li.classList.add('badge-da');
                        badge_title = ' – dobry artykuł';
                        break;
                }
                li.title = sitelink.Title + badge_title;
                this.LanguagesList.appendChild(li);

                if(!sitelink.IsRecommended && processed_links.length > 10) {
                    hidden_li.push(li);
                    li.style.display = 'none';
                }
            }

            // Dodaj link "pokaż wszystkie"
            if(hidden_li.length > 0) {
                let li = document.createElement('li');
                let a = document.createElement('a');
                a.href = 'javascript:void(0)';
                a.innerText = 'pokaż więcej';
                li.appendChild(a);
                li.appendChild(document.createTextNode(` (${hidden_li.length} ukrytych)`));
                this.LanguagesList.appendChild(li);

                a.addEventListener('click', (e) => {
                    for(let elem of hidden_li) {
                        elem.style.display = '';
                    }
                    li.remove();
                    e.stopPropagation();    // Dzięki temu kliknięcie nie ukrywa panelu
                });
            }

            if(processed_links.length == 0) {
                this.NoLinks.style.display = '';
            } else {
                this.LanguagesList.style.display = '';
            }
            this.Loading.style.display = 'none';
        }

        /**
         * Przygotowuje listę języków do pokazania na innym elemencie
         * (tj. opróżnia ją i pokazuje ikonę ładowania).
         */
        public PrepareForNextDisplay() {
            this.LanguagesList.innerText = '';
            this.LanguagesList.style.display = 'none';

            this.NoLinks.style.display = 'none';
            this.LoadingError.style.display = 'none';
            this.Loading.style.display = '';
        }

        /**
         * Wyświetla komunikat o błędzie wczytywania danych
         */
        public DisplayLoadingError() {
            this.Loading.style.display = 'none';
            this.LoadingError.style.display = '';
        }

        /** Ustawia fokus na pierwszy link na liście */
        public FocusFirstLink() {
            // Jeśli przycisk "Utwórz stronę" jest widoczny, ustaw na niego fokus
            let create_style = window.getComputedStyle(this.CreateArticleWrapper);
            if(create_style.getPropertyValue('display') != 'none') {
                this.CreateButton.focus();
                return;
            }

            for(let li of this.LanguagesList.children) {
                if(!(li instanceof HTMLElement)) continue;
                if(li.style.display == 'none') continue;

                for(let child of li.children) {
                    if(child instanceof HTMLAnchorElement) {
                        child.focus();
                        return;
                    }
                }
            }
            this.WikidataLink.focus();
        }

        /**
         * Jeśli ostatnio sfokusowany był pierwszy link na liście, przenosi fokus na ostatni
         * @param e Zdarzenie naciśnięcia klawisza. Zostaje anulowane, by przeglądarka nie przenosiła fokusu
         */
        protected MoveFocusToEndIfNeeded(e?: KeyboardEvent) {
            // Jeśli przycisk "Utwórz stronę" jest widoczny, sprawdź czy ma fokus
            let create_style = window.getComputedStyle(this.CreateArticleWrapper);
            if(create_style.getPropertyValue('display') != 'none') {
                // Jeśli "Utwórz stronę" jest aktywny, ustaw fokus na koniec
                if(document.activeElement == this.CreateButton) {
                    this.WikidataLink.focus();
                    e?.preventDefault();
                } else {
                    return;
                }
            }

            if(!this.LanguagesList.contains(document.activeElement)) return;
            let li = document.activeElement?.parentElement?.previousElementSibling as (HTMLElement | null | undefined);

            while(li !== null && li !== undefined) {
                // Jeśli poprzednik <li> jest widoczny, nic nie rób
                if(li.style.display != 'none') return;
                li = li.previousElementSibling as (HTMLElement | null);
            }

            this.WikidataLink.focus();
            e?.preventDefault();
        }

        /**
         * Tworzy adres URL odpowiadający linkowi
         * @param sitelink Obiekt, reprezentujący link do projektu Wikimedia
         */
        protected BuildUrl(sitelink: ProcessedSitelink) {
            let encoded_title = encodeURI(sitelink.Title.replace(' ', '_'));
            return `//${sitelink.LanguageCode}.wikipedia.org/wiki/${encoded_title}`;
        }

        /**
         * Odfiltrowuje linki do innych projektów niż Wikipedia. Sortuje je
         * według odznaczeń oraz preferencji użytkownika, odczytanych z ULS
         * @param sitelinks Tablica linków do innych języków
         */
        protected SortAndFilterLinks(sitelinks: Sitelink[]): ProcessedSitelink[] {
            //@ts-ignore - mw.uls nie istnieje w definicjach :(
            let recommended_langs: Set<string> = new Set(mw?.uls?.getFrequentLanguageList() ?? []);
            // Upewnij się, że w rekomendowanych językach jest kilka ważniejszych Wikipedii
            recommended_langs.add('en').add('de').add('fr').add('ru').add('es');

            let processed_anm = [];
            let processed_lnm = [];
            let processed_da = [];
            let processed_nobadge = [];

            for(let sitelink of sitelinks) {
                // Id innych projektów zawiera dopisek po "wiki"
                if(!sitelink.Site.endsWith('wiki')) continue;
                if(sitelink.Site == 'commonswiki'
                    || sitelink.Site == 'metawiki'
                    || sitelink.Site == 'wikidatawiki') continue;

                let processed_link: ProcessedSitelink = {
                    Title: sitelink.Title,
                    LanguageCode: sitelink.LanguageCode,
                    LanguageName: GetLanguageName(sitelink.LanguageCode),
                    IsRecommended: recommended_langs.has(sitelink.LanguageCode),
                    Badge: sitelink.Badge
                };

                switch(processed_link.Badge) {
                    case Badge.AnM: processed_anm.push(processed_link); break;
                    case Badge.LnM: processed_lnm.push(processed_link); break;
                    case Badge.DA: processed_da.push(processed_link); break;
                    default: processed_nobadge.push(processed_link); break;
                }
            }

            let sitelink_comparer = (a: ProcessedSitelink, b: ProcessedSitelink) => {
                const locale = 'pl';
                const a_name = a.LanguageName.toLocaleLowerCase(locale);
                const b_name = b.LanguageName.toLocaleLowerCase(locale);
                return a_name.localeCompare(b_name, locale);
            };

            /* Posortuj alfabetycznie języki */
            processed_anm.sort(sitelink_comparer);
            processed_lnm.sort(sitelink_comparer);
            processed_da.sort(sitelink_comparer);
            processed_nobadge.sort(sitelink_comparer);

            return processed_anm.concat(processed_lnm, processed_da, processed_nobadge);
        }
    }
}