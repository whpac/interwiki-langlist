namespace Msz2001.InterwikiLanglist {

    export class LangList {
        /** Ramka, zawierająca listę języków */
        protected Wrapper: HTMLElement;
        /** Widok dla listy */
        protected View: LangListView;

        /** Element, do którego aktualnie jest zakotwiczona lista języków */
        protected CurrentAnchor: HTMLElement | null;

        public constructor() {
            this.CurrentAnchor = null;

            this.Wrapper = document.createElement('div');
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
            this.View.PopulateLanguagesList(await languages);
        }

        /**
         * Wyświetla selektor języków "przypięty" do danego linku
         * @param anchor Ikonka "Wikidane", do której należy przypiąć panel
         */
        public Display(anchor: HTMLElement) {
            this.CurrentAnchor = anchor;
            this.RepositionSelf();
            this.Wrapper.style.display = 'block';
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
        protected RepositionSelf() {
            if(this.CurrentAnchor === null) return;

            let scroll_offset = document.body.getBoundingClientRect().top;
            let bounding_rect = this.CurrentAnchor.getBoundingClientRect();

            this.Wrapper.style.top = (bounding_rect.bottom - scroll_offset) + 'px';
            this.Wrapper.style.left = bounding_rect.left + 'px';
        }
    }
}