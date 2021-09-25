namespace Msz2001.InterwikiLanglist {
    /**
     * Wyszukuje hiperłącze do innego projektu Wikimedia wewnątrz elementu
     * @param iw_link_wrapper Wrapper linku interwiki
     */
    let extractInterwikiLink = (iw_link_wrapper: HTMLElement) => {
        if(!iw_link_wrapper.classList.contains('link-interwiki-wd')
            && iw_link_wrapper.parentElement instanceof HTMLAnchorElement) {

            // Jeżeli wrapper jest wewnątrz linku, wyciągnij go na zewnątrz
            let link = iw_link_wrapper.parentElement;
            link.parentElement?.insertBefore(iw_link_wrapper, link);

            // Przenieś dzieci wrappera do linku
            for(let child of iw_link_wrapper.childNodes) {
                link.appendChild(child);
            }
            iw_link_wrapper.appendChild(link);

            return link;
        }

        for(let child of iw_link_wrapper.children) {
            if(child instanceof HTMLAnchorElement) return child;
        }
        return null;
    };

    /**
     * Wyciąga identyfikator artykułu z linku
     * @param iw_link Hiperłącze interwiki
     */
    let extractArticleId = (iw_link: HTMLAnchorElement) => {
        let title_prefix = '.org/wiki/';
        let title_prefix_pos = iw_link.href.indexOf(title_prefix);
        if(title_prefix_pos < 0) return null;

        let title_pos = title_prefix_pos + title_prefix.length;
        let title = iw_link.href.substr(title_pos);

        //(język).wikipedia.org/ poprzedzone opcjonalnie "m." i/lub "www."
        let match = /\/\/(?:www.)?(?:m.)?([^.]+)\.wikipedia\.org\//i.exec(iw_link.href);
        let lang = match?.[1];
        if(lang !== undefined) {
            return new ArticleId(lang + 'wiki', title);
        }

        // Sprawdź, czy link prowadzi do Wikidanych
        if(iw_link.href.indexOf('wikidata.org') >= 0) {
            return new ArticleId(ArticleId.WIKIDATA, title);
        }

        return null;
    };

    $(() => {
        // Wyszukaj interwiki wstawione za pomocą {link-interwiki}
        let iw_link_wrappers = document.querySelectorAll('.link-interwiki');
        let langlist = new LangList();

        for(let iw_link_wrapper of iw_link_wrappers) {
            if(!(iw_link_wrapper instanceof HTMLElement)) continue;

            // Znajdź link; jeśli nie istnieje, to pomiń iterację
            let interwiki_link = extractInterwikiLink(iw_link_wrapper);
            if(interwiki_link === null) continue;

            const article_id = extractArticleId(interwiki_link);
            if(article_id === null) continue;

            // Wyłącz link interwiki i zastąp go symbolem wyboru języka
            interwiki_link.href = 'javascript:void(0)';
            interwiki_link.title = 'Zobacz, w jakich językach ten artykuł istnieje';
            interwiki_link.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/4/45/Translate_link_color_crop.svg" alt="[w innych językach]" width="12" />';

            let red_link: HTMLAnchorElement | undefined;
            if(iw_link_wrapper.previousElementSibling instanceof HTMLAnchorElement) {
                red_link = iw_link_wrapper.previousElementSibling;
            }

            let is_minerva = document.body.classList.contains('skin-minerva');
            if(is_minerva && red_link !== undefined) {
                // Utwórz nowy link, by usunąć procedury obsługi zdarzeń,
                // m.in. odpowiadające za wyświetlenia okna proponującego stworzenie strony
                let cloned_link = red_link.cloneNode(true) as HTMLAnchorElement;
                red_link.parentElement?.insertBefore(cloned_link, red_link);
                red_link.remove();
                red_link = cloned_link;
            }

            let display_langlist = (reason: VisibilityChangeReason, e?: MouseEvent) => {
                if(langlist.IsVisible) return;

                let result = WikidataClient.GetSitelinks(article_id);
                langlist.Display(iw_link_wrapper as HTMLElement, reason, red_link);
                langlist.Populate(result, red_link?.href);
                e?.preventDefault();
            };

            // Kliknięcie ikonkę pokazuje panel języków
            interwiki_link?.addEventListener('click', (e) => display_langlist(VisibilityChangeReason.KeyPress, e));

            // Poza skórką Minerva, panel pokazuje się również po najechaniu na ikonkę
            // W Minervie z kolei, można kliknąć również na czerwony link
            if(!is_minerva) {
                iw_link_wrapper.addEventListener('mouseenter', () => display_langlist(VisibilityChangeReason.MouseMove));
            } else {
                red_link?.addEventListener('click', (e) => display_langlist(VisibilityChangeReason.KeyPress, e));
            }
        }

        if(iw_link_wrappers.length > 0) {
            // Służy do ukrywania selektora języków
            document.addEventListener('mousemove', (ev) => {
                if(!langlist.IsVisible) return;

                let selector_rect = langlist.GetBoundingClientRect();

                let is_out_X = ev.clientX < selector_rect.left || ev.clientX > selector_rect.right;
                let is_out_Y = ev.clientY < selector_rect.top || ev.clientY > selector_rect.bottom;

                if(is_out_X || is_out_Y) langlist.Hide(VisibilityChangeReason.MouseMove);
            });

            document.addEventListener('keydown', (e) => {
                if(e.code != 'Escape') return;
                langlist.Hide(VisibilityChangeReason.KeyPress);
            });

            // Jeśli za blisko jednej z krawędzi, przesuń się
            let scrolling = false;
            window.addEventListener('scroll', () => {
                // Ogranicza częstotliwość przeliczania położenia
                if(!scrolling) {
                    window.requestAnimationFrame(() => {
                        langlist.RepositionSelf();
                        scrolling = false;
                    });
                }

                scrolling = true;
            });

            // Kliknięcie poza listą języków ukrywa ją
            window.addEventListener('click', (e) => {
                if(!langlist.IsVisible) return;
                if(!(e.target instanceof HTMLElement)) return;

                if(langlist.IsElementRelatedToPanel(e.target)) return;
                langlist.Hide(VisibilityChangeReason.KeyPress);
            });
        }
    });
}
