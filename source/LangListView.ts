namespace Msz2001.InterwikiLanglist {

    /** Klasa zarządzająca zawartością listy języków */
    export class LangListView {
        protected WikidataLink: HTMLAnchorElement;

        public constructor(wrapper: HTMLElement) {
            let header = document.createElement('header');
            header.textContent = 'Dostępne języki';
            wrapper.appendChild(header);

            let content_list = document.createElement('ul');
            content_list.innerHTML = '<li>English</li><li>Deutsch</li>';
            wrapper.appendChild(content_list);

            let footer = document.createElement('footer');
            footer.textContent = 'Pobrano z ';
            wrapper.appendChild(footer);

            this.WikidataLink = document.createElement('a');
            this.WikidataLink.textContent = 'elementu Wikidanych';
            this.WikidataLink.href = 'https://wikidata.org';
            footer.appendChild(this.WikidataLink);
        }

        public SetWikidataElement(q_id: string) {
            this.WikidataLink.href = `https://www.wikidata.org/wiki/Special:EntityData/${q_id}`;
        }
    }
}