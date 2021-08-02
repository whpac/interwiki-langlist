$(() => {
    // Wyszukaj interwiki do Wikidanych
    let wd_links = document.querySelectorAll('.link-interwiki-wd');
    let langlist = new Msz2001.InterwikiLanglist.LangList();

    for(let wd_link of wd_links) {
        if(!(wd_link instanceof HTMLElement)) continue;

        // Znajdź link i wyciągnij z niego identyfikator elementu
        let q_id = '';
        for(let child of wd_link.children) {
            if(!(child instanceof HTMLAnchorElement)) continue;
            if(child.href.indexOf('wikidata.org') < 0) continue;

            let q_pos = child.href.lastIndexOf('/Q');
            q_id = child.href.substr(q_pos + 1);

            // Wyłącz link do Wikidanych i zastąp ikonkę bardziej czytelnym symbolem
            child.href = 'javascript:void(0)';
            child.title = 'Zobacz, w jakich językach ten artykuł istnieje';
            child.style.cursor = 'auto';
            child.style.textDecoration = 'none';
            child.style.fontSize = '0.8em';
            child.textContent = '字';
        }

        // Po najechaniu ikonki "Wikidane", pokaż panel z językami
        wd_link.addEventListener('mouseenter', () => {
            let sitelinks = Msz2001.InterwikiLanglist.WikidataClient.GetSitelinks(q_id);
            langlist.Populate(q_id, sitelinks);
            langlist.Display(wd_link as HTMLElement);
        });
    }

    if(wd_links.length > 0) {
        // Służy do ukrywania selektora języków
        document.addEventListener('mousemove', (ev) => {
            let selector_rect = langlist.GetBoundingClientRect();

            let is_out_X = ev.clientX < selector_rect.left || ev.clientX > selector_rect.right;
            let is_out_Y = ev.clientY < selector_rect.top || ev.clientY > selector_rect.bottom;

            if(is_out_X || is_out_Y) langlist.Hide();
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
    }
});
