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
        public Populate(q_id: string, languages: string[]) {
            this.View.SetWikidataElement(q_id);
        }

        /**
         * Wyświetla selektor języków "przypięty" do danego linku
         * @param anchor Ikonka "Wikidane", do której należy przypiąć panel
         */
        public Display(anchor: HTMLElement) {
            this.CurrentAnchor = anchor;
            this.RepositionSelf();
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