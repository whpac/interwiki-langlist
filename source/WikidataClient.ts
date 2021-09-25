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

    export type WikidataResult = {
        ArticleId: ArticleId;
        QId: string | null;
        Sitelinks: Sitelink[];
    };

    export class ArticleId {
        public static readonly WIKIDATA = 'wikidatawiki';

        public constructor(
            public WikiId: string,
            public Title: string
        ) { }

        public ToString(): string {
            return `${this.WikiId}::${this.Title}`;
        }
    };

    /** Udostępnia interfejs do Wikidanych */
    export class WikidataClient {
        /** Przechowuje wcześniej pobrane linki. Czyszczone przy przeładowaniu strony */
        protected static SitelinkCache: Map<string, WikidataResult> = new Map();

        /**
         * Zwraca listę linków do innych wersji językowych
         * @param article_id Identyfikator artykułu
         */
        public static async GetSitelinks(article_id: ArticleId): Promise<WikidataResult> {
            let cached = this.SitelinkCache.get(article_id.ToString());
            if(cached !== undefined) return cached;

            let result = await this.FetchSitelinks(article_id);
            this.SitelinkCache.set(article_id.ToString(), result);
            return result;
        }

        /**
         * Pobiera listę linków do innych wersji językowych z Wikidanych
         * @param article Identyfikator artykułu
         */
        protected static FetchSitelinks(article: ArticleId) {
            return new Promise<WikidataResult>((resolve, reject) => {

                // mw.ForeignApi nie istnieje u użytkowników niezalogowanych
                // Dlatego żądanie trzeba zrealizować "ręcznie"
                let xhr = new XMLHttpRequest();
                xhr.addEventListener('load', () => {
                    try {
                        let data = JSON.parse(xhr.responseText);
                        let entity = Object.entries(data.entities)[0] as [string, any];

                        let q_id: string | null = entity[0];
                        if(!q_id.startsWith('Q')) q_id = null;

                        let sitelinks = WikidataClient.ParseSitelinks(entity[1].sitelinks);
                        if(sitelinks.length == 0 && article.WikiId != ArticleId.WIKIDATA) {
                            sitelinks = [WikidataClient.ArticleIdToSitelink(article)];
                        }
                        resolve({
                            ArticleId: article,
                            QId: q_id,
                            Sitelinks: sitelinks
                        });
                    } catch(e) {
                        reject(e);
                    }
                });

                let title = article.Title.replace('&', '%26');
                title = title.replace('=', '%3D');

                let selector = `ids=${title}`;
                if(article.WikiId != ArticleId.WIKIDATA) {
                    selector = `sites=${article.WikiId}&titles=${title}`;
                }

                xhr.addEventListener('error', () => reject());
                xhr.open('GET', `https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&${selector}&origin=https%3A%2F%2F${window.location.hostname}&props=sitelinks`, true);
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

        /**
         * Przetwarza id artykułu na obiekt opisujący link
         * @param article Id artykułu
         */
        protected static ArticleIdToSitelink(article: ArticleId): Sitelink {
            let wiki_pos = article.WikiId.lastIndexOf('wiki');
            let lang_code = article.WikiId.substr(0, wiki_pos);

            return {
                Title: article.Title,
                Site: article.WikiId,
                LanguageCode: lang_code,
                Badge: Badge.None
            };
        }
    }
}