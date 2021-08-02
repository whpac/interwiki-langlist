(() => {
    let wd_links = document.querySelectorAll('.link-interwiki-wd');
    let langlist = new Msz2001.InterwikiLanglist.LangList();

    for(let wd_link of wd_links) {
        if(!(wd_link instanceof HTMLElement)) continue;

        wd_link.addEventListener('mouseenter', () => {
            langlist.Display(wd_link as HTMLElement);
        });
    }
})();
