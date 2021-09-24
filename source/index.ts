namespace Msz2001.InterwikiLanglist {
    $(() => {
        // Wyszukaj interwiki do Wikidanych
        let wd_links = document.querySelectorAll('.link-interwiki-wd');
        let langlist = new LangList();

        for(let wd_link of wd_links) {
            if(!(wd_link instanceof HTMLElement)) continue;

            // Znajdź link i wyciągnij z niego identyfikator elementu
            let q_id = '';
            let inner_link: HTMLAnchorElement | undefined;
            for(let child of wd_link.children) {
                if(!(child instanceof HTMLAnchorElement)) continue;
                if(child.href.indexOf('wikidata.org') < 0) continue;

                let q_pos = child.href.lastIndexOf('/Q');
                q_id = child.href.substr(q_pos + 1);

                // Wyłącz link do Wikidanych i zastąp ikonkę bardziej czytelnym symbolem
                child.href = 'javascript:void(0)';
                child.title = 'Zobacz, w jakich językach ten artykuł istnieje';
                child.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/4/45/Translate_link_color_crop.svg" alt="[w innych językach]" width="12" />';
                inner_link = child;
                break;
            }

            let red_link: HTMLAnchorElement | undefined;
            if(wd_link.previousElementSibling instanceof HTMLAnchorElement) {
                red_link = wd_link.previousElementSibling;
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

                let article_id = new ArticleId(ArticleId.WIKIDATA, q_id);
                let sitelinks = WikidataClient.GetSitelinks(article_id);
                langlist.Populate(q_id, sitelinks, red_link?.href);
                langlist.Display(wd_link as HTMLElement, reason, red_link);
                e?.preventDefault();
            };

            // Kliknięcie ikonkę pokazuje panel języków
            inner_link?.addEventListener('click', (e) => display_langlist(VisibilityChangeReason.KeyPress, e));

            // Poza skórką Minerva, panel pokazuje się również po najechaniu na ikonkę
            // W Minervie z kolei, można kliknąć również na czerwony link
            if(!is_minerva) {
                wd_link.addEventListener('mouseenter', () => display_langlist(VisibilityChangeReason.MouseMove));
            } else {
                red_link?.addEventListener('click', (e) => display_langlist(VisibilityChangeReason.KeyPress, e));
            }
        }

        if(wd_links.length > 0) {
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
