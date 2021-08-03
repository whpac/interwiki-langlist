namespace Msz2001.InterwikiLanglist {

    export type Sitelink = {
        Title: string;
        Site: string;
        LanguageCode: string;
        Badge: Badge;
    };

    export enum Badge {
        None,
        AnM,
        DA,
        LnM
    }

    /** Udostępnia interfejs do Wikidanych */
    export class WikidataClient {
        /** Przechowuje wcześniej pobrane linki. Czyszczone przy przeładowaniu strony */
        protected static SitelinkCache: Map<string, Sitelink[]> = new Map();

        /**
         * Zwraca listę linków do innych wersji językowych
         * @param q_id Identyfikator elementu w Wikidanych
         */
        public static async GetSitelinks(q_id: string): Promise<Sitelink[]> {
            let cached = this.SitelinkCache.get(q_id);
            if(cached !== undefined) return cached;

            let sitelinks = await this.FetchSitelinks(q_id);
            this.SitelinkCache.set(q_id, sitelinks);
            return sitelinks;
        }

        /**
         * Pobiera listę linków do innych wersji językowych z Wikidanych
         * @param q_id Identyfikator elementu w Wikidanych
         */
        protected static FetchSitelinks(q_id: string) {
            return new Promise<Sitelink[]>((resolve, reject) => {

                // mw.ForeignApi nie istnieje u użytkowników niezalogowanych
                // Dlatego żądanie trzeba zrealizować "ręcznie"
                var xhr = new XMLHttpRequest();
                xhr.addEventListener('load', () => {
                    try {
                        let data = JSON.parse(xhr.responseText);
                        let entity = data.entities[q_id];

                        resolve(WikidataClient.ParseSitelinks(entity.sitelinks));
                    } catch(e) {
                        reject(e);
                    }
                });
                xhr.addEventListener('error', () => reject());
                xhr.open('GET', `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&ids=${q_id}&origin=https%3A%2F%2Fpl.wikipedia.org&props=sitelinks`, true);
                xhr.send();
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
                let sitelink: { site?: string; title?: string; badges?: string[]; } = raw[wiki_id];

                if(!('site' in sitelink) || typeof sitelink.site !== 'string') continue;
                if(!('title' in sitelink) || typeof sitelink.title !== 'string') continue;

                let wiki_pos = sitelink.site.lastIndexOf('wiki');
                let lang_code = sitelink.site.substr(0, wiki_pos);
                let badge = Badge.None;

                if(sitelink.badges?.includes('Q17437798')) badge = Badge.DA;
                if(sitelink.badges?.includes('Q17506997')) badge = Badge.LnM;
                if(sitelink.badges?.includes('Q17437796')) badge = Badge.AnM;

                links.push({
                    Title: sitelink.title,
                    Site: sitelink.site,
                    LanguageCode: lang_code,
                    Badge: badge
                });
            }

            return links;
        }
    }
}