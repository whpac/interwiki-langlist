(() => {
    let wd_links = document.querySelectorAll('.link-interwiki-wd');
    let langlist = new Msz2001.InterwikiLanglist.LangList();

    for(let wd_link of wd_links) {
        if(!(wd_link instanceof HTMLElement)) continue;

        let q_id = '';
        for(let child of wd_link.children) {
            if(!(child instanceof HTMLAnchorElement)) continue;
            if(child.href.indexOf('wikidata.org') < 0) continue;

            let q_pos = child.href.lastIndexOf('/Q');
            q_id = child.href.substr(q_pos + 1);
        }

        wd_link.addEventListener('mouseenter', () => {
            langlist.Populate(q_id, []);
            langlist.Display(wd_link as HTMLElement);
        });
    }
})();
