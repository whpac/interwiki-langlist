namespace Msz2001.InterwikiLanglist {

    /** Klasa zarządzająca zawartością listy języków */
    export class LangListView {
        protected WikidataLink: HTMLAnchorElement;
        protected LanguagesList: HTMLElement;

        public constructor(wrapper: HTMLElement) {
            let header = document.createElement('header');
            header.textContent = 'Dostępne języki';
            wrapper.appendChild(header);

            this.LanguagesList = document.createElement('ul');
            wrapper.appendChild(this.LanguagesList);

            let footer = document.createElement('footer');
            footer.textContent = 'Pobrano z ';
            wrapper.appendChild(footer);

            this.WikidataLink = document.createElement('a');
            this.WikidataLink.textContent = 'elementu Wikidanych';
            this.WikidataLink.href = 'https://wikidata.org';
            footer.appendChild(this.WikidataLink);

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
         * Wypełnia listę linków do wersji językowych
         * @param sitelinks Tablica linków do innych wersji językowych
         */
        public PopulateLanguagesList(sitelinks: Sitelink[]) {
            this.LanguagesList.innerText = '';

            for(let sitelink of this.SortAndFilterLinks(sitelinks)) {
                let li = document.createElement('li');
                li.innerHTML = `<a href="${this.BuildUrl(sitelink)}">${this.GetLanguageDisplayName(sitelink)}</a>`;
                this.LanguagesList.appendChild(li);
            }
        }

        /**
         * Przygotowuje listę języków do pokazania na innym elemencie
         * (tj. opróżnia ją i pokazuje ikonę ładowania).
         */
        public PrepareForNextDisplay() {
            this.LanguagesList.innerText = '';
            this.LanguagesList.innerHTML = '<li>Ładowanie</li>';
        }

        /**
         * Tworzy adres URL odpowiadający linkowi
         * @param sitelink Obiekt, reprezentujący link do projektu Wikimedia
         */
        protected BuildUrl(sitelink: Sitelink) {
            let encoded_title = encodeURI(sitelink.Title.replace(' ', '_'));
            return `//${sitelink.LanguageCode}.wikipedia.org/wiki/${encoded_title}`;
        }

        /**
         * Zwraca wyświetlaną nazwę języka, w którym jest treść pod linkiem
         * @param sitelink Obiekt, reprezentujący link do projektu Wikimedia
         */
        protected GetLanguageDisplayName(sitelink: Sitelink) {
            //@ts-ignore - $.uls nie istnieje w definicjach
            return $?.uls?.data?.getAutonym(sitelink.LanguageCode) ?? sitelink.LanguageCode;
        }

        /**
         * Odfiltrowuje linki do innych projektów niż Wikipedia. Sortuje je
         * według odznaczeń oraz preferencji użytkownika, odczytanych z ULS
         * @param sitelinks Tablica linków do innych języków
         */
        protected SortAndFilterLinks(sitelinks: Sitelink[]) {
            return sitelinks;
        }
    }
}