namespace Msz2001.InterwikiLanglist {

    export enum VisibilityChangeReason {
        MouseMove,
        KeyPress,
        Scroll
    }

    export class LangList {
        /** Ramka, zawierająca listę języków */
        protected Wrapper: HTMLElement;
        /** Element zaciemniający stronę */
        protected Backdrop: HTMLElement;
        /** Widok dla listy */
        protected View: LangListView;
        /** Czy panel został automatycznie sfokusowany */
        protected AutoFocused: boolean = false;

        /** Element, do którego aktualnie jest zakotwiczona lista języków */
        protected CurrentAnchor: HTMLElement | null;
        /** Czerwony link, powiązany z elementem */
        protected CurrentRedLink: HTMLAnchorElement | null;

        /** Czy panel jest widoczny */
        public get IsVisible() {
            return this.CurrentAnchor !== null;
        }

        public constructor() {
            this.CurrentAnchor = null;
            this.CurrentRedLink = null;

            this.Backdrop = document.createElement('div');
            this.Backdrop.classList.add('interwiki-langlist-backdrop');
            document.body.appendChild(this.Backdrop);

            this.Wrapper = document.createElement('div');
            this.Wrapper.classList.add('interwiki-langlist-wrapper');
            document.body.insertBefore(this.Wrapper, this.Backdrop);

            this.View = new LangListView(this.Wrapper);

            window.addEventListener('resize', this.RepositionSelf.bind(this));
        }

        /**
         * Wypełnia listę języków
         * @param q_id Identyfikator w Wikidanych
         * @param response_awaiter Odpowiedź z Wikidanych
         * @param create_url Link do utworzenia artykułu
         */
        public async Populate(response_awaiter: Promise<WikidataResult>, create_url: string | undefined) {
            this.View.SetCreateUrl(create_url);

            try {
                let response = await response_awaiter;
                this.View.SetWikidataElement(response.QId);
                this.View.PopulateLanguagesList(response.Sitelinks, response.ArticleId.WikiId);
            } catch(e) {
                this.View.DisplayLoadingError();
            }
            window.requestAnimationFrame(() => {
                if(this.AutoFocused) this.View.FocusFirstLink();
                this.RepositionSelf();
            });
        }

        /**
         * Wyświetla selektor języków "przypięty" do danego linku
         * @param anchor Ikonka "Wikidane", do której należy przypiąć panel
         * @param reason Dlaczego należy pokazać element
         * @param red_link Czerwony link, powiązany z panelem
         */
        public Display(anchor: HTMLElement, reason: VisibilityChangeReason, red_link: HTMLAnchorElement | null = null) {
            this.CurrentAnchor = anchor;
            this.AutoFocused = reason == VisibilityChangeReason.KeyPress;
            this.CurrentRedLink = red_link;

            window.requestAnimationFrame(() => {
                this.Wrapper.classList.add('shown');
                this.RepositionSelf();
            });
        }

        /**
         * Ukrywa selektor języków
         * @param reason Powód ukrycia
         */
        public Hide(reason: VisibilityChangeReason) {
            // Jeśli pokazano po kliknięciu, ignoruj wyjeżdżanie myszą
            if(reason == VisibilityChangeReason.MouseMove
                && this.AutoFocused) return;

            // Przywróć fokus do dokumentu
            if(this.AutoFocused && this.CurrentAnchor !== null) {
                for(let child of this.CurrentAnchor.children) {
                    if(child instanceof HTMLAnchorElement) {
                        child.focus();
                        break;
                    }
                }
                this.CurrentAnchor.focus();
            }

            this.CurrentAnchor = null;
            this.CurrentRedLink = null;
            this.Wrapper.classList.remove('shown');
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
            if(anchor_rect.bottom < 0 || anchor_rect.top > window.innerHeight) this.Hide(VisibilityChangeReason.Scroll);
            if(anchor_rect.right < 0 || anchor_rect.left > window.innerWidth) this.Hide(VisibilityChangeReason.Scroll);
        }

        /**
         * Sprawdza, czy element należy do panelu lub kotwicy
         * @param element Element do sprawdzenia
         */
        public IsElementRelatedToPanel(element: HTMLElement) {
            if(this.Wrapper.contains(element) || this.Wrapper === element) return true;
            if(this.CurrentAnchor?.contains(element) || this.CurrentAnchor === element) return true;
            if(this.CurrentRedLink?.contains(element) || this.CurrentRedLink === element) return true;
            return false;
        }
    }
}