namespace Msz2001.InterwikiLanglist {

    export type Sitelink = {
        Title: string;
        Site: string;
        LanguageCode: string;
    };

    export class WikidataClient {

        /**
         * Zwraca listę linków do projektów siostrzanych
         * @param q_id Identyfikator elementu w Wikidanych
         */
        public static GetSitelinks(q_id: string) {
            return new Promise<Sitelink[]>((resolve, reject) => {
                let params = {
                    action: 'wbgetentities',
                    ids: q_id,
                    props: 'sitelinks'
                };
                let api = new mw.ForeignApi('https://www.wikidata.org/w/api.php');

                api.get(params).done(function (data) {
                    let entity = data.entities[q_id];

                    resolve(WikidataClient.ParseSitelinks(entity.sitelinks));
                }).catch((err) => {
                    reject(err);
                });
            });
        }

        /**
         * Przetwarza odpowiedź API Wikidanych i zwraca listę linków do innych wersji językowych
         * @param raw Obiekt sitelinks, pochodzący z API do Wikidanych
         */
        protected static ParseSitelinks(raw: any): Sitelink[] {
            if(typeof raw !== 'object') return [];

            let links = [];

            for(let wiki_id in raw) {
                let sitelink: { site?: string, title?: string; } = raw[wiki_id];

                if(!('site' in sitelink) || typeof sitelink.site !== 'string') continue;
                if(!('title' in sitelink) || typeof sitelink.title !== 'string') continue;

                let wiki_pos = sitelink.site.lastIndexOf('wiki');
                let lang_code = sitelink.site.substr(0, wiki_pos);

                links.push({
                    Title: sitelink.title,
                    Site: sitelink.site,
                    LanguageCode: lang_code
                });
            }

            return links;
        }
    }
}