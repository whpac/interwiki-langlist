namespace Msz2001.InterwikiLanglist {

    export class LangList {
        /** Ramka, zawierająca listę języków */
        protected Wrapper: HTMLElement;
        /** Widok dla listy */
        protected View: LangListView;

        /** Element, do którego aktualnie jest zakotwiczona lista języków */
        protected CurrentAnchor: HTMLElement | null;

        /** Czy panel jest widoczny */
        public get IsVisible() {
            return this.CurrentAnchor !== null;
        }

        public constructor() {
            this.CurrentAnchor = null;

            this.Wrapper = document.createElement('div');
            this.Wrapper.style.display = 'none';
            this.Wrapper.classList.add('interwiki-langlist-wrapper');
            document.body.appendChild(this.Wrapper);

            this.View = new LangListView(this.Wrapper);

            window.addEventListener('resize', this.RepositionSelf.bind(this));
        }

        /**
         * Wypełnia listę języków
         * @param q_id Identyfikator w Wikidanych
         * @param languages Lista nazw w innych językach
         */
        public async Populate(q_id: string, languages: Promise<Sitelink[]>) {
            this.View.SetWikidataElement(q_id);
            try {
                this.View.PopulateLanguagesList(await languages);
            } catch(e) {
                this.View.DisplayLoadingError();
            }
            this.RepositionSelf();
        }

        /**
         * Wyświetla selektor języków "przypięty" do danego linku
         * @param anchor Ikonka "Wikidane", do której należy przypiąć panel
         */
        public Display(anchor: HTMLElement) {
            this.CurrentAnchor = anchor;
            this.Wrapper.style.display = 'block';
            this.RepositionSelf();
        }

        /**
         * Ukrywa selektor języków
         */
        public Hide() {
            this.CurrentAnchor = null;
            this.Wrapper.style.display = 'none';
            this.View.PrepareForNextDisplay();
        }

        /**
         * Zwraca prostokąt, okalający selektor. Dodaje margines przekazany w parametrze
         * @param margin Margines, który jest uznawany za należący do selektora
         */
        public GetBoundingClientRect(margin: number = 16) {
            if(this.CurrentAnchor === null) {
                return new DOMRect(0, 0, 0, 0);
            }

            let anchor_rect = this.CurrentAnchor.getBoundingClientRect();
            let selector_rect = this.Wrapper.getBoundingClientRect();

            let leftmost = Math.min(anchor_rect.left, selector_rect.left) - margin;
            let rightmost = Math.max(anchor_rect.right, selector_rect.right) + margin;
            let topmost = Math.min(anchor_rect.top, selector_rect.top) - margin;
            let bottommost = Math.max(anchor_rect.bottom, selector_rect.bottom) + margin;

            return new DOMRect(leftmost, topmost, rightmost - leftmost, bottommost - topmost);
        }

        /**
         * Ustawia panel w taki sposób, by przylegał do ikonki "Wikidane"
         */
        public RepositionSelf() {
            if(this.CurrentAnchor === null) return;

            let margin = 16; // Odległość od brzegów okna, której panel nie powinien przekroczyć
            let horz_offset = 16; // Poziome przesunięcie brzegu panelu względem brzegu ikonki "Wikidane"

            let anchor_rect = this.CurrentAnchor.getBoundingClientRect();
            let own_rect = this.Wrapper.getBoundingClientRect();

            // Domyślnie panel wyświetla się pod ikonką i "w prawo"
            let top = anchor_rect.bottom;
            let left = anchor_rect.left - horz_offset;

            if(top + own_rect.height > window.innerHeight - margin) {
                // Trzeba panel ułożyć powyżej
                top = Math.max(anchor_rect.top - own_rect.height, margin);
            }

            if(left + own_rect.width > window.innerWidth - margin) {
                // Trzeba panel ułożyć "w lewo"
                left = Math.max(anchor_rect.right - own_rect.width + horz_offset, margin);
            }

            this.Wrapper.style.top = top + 'px';
            this.Wrapper.style.left = left + 'px';

            // Jeśli ikonka "Wikidane" wyszła poza ekran, ukryj
            if(anchor_rect.bottom < 0 || anchor_rect.top > window.innerHeight) this.Hide();
            if(anchor_rect.right < 0 || anchor_rect.left > window.innerWidth) this.Hide();
        }
    }
}