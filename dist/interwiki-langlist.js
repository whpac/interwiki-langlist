"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var Msz2001;
(function (Msz2001) {
    var InterwikiLanglist;
    (function (InterwikiLanglist) {
        var LangList = /** @class */ (function () {
            function LangList() {
                this.CurrentAnchor = null;
                this.Wrapper = document.createElement('div');
                this.Wrapper.classList.add('interwiki-langlist-wrapper');
                document.body.appendChild(this.Wrapper);
                this.View = new InterwikiLanglist.LangListView(this.Wrapper);
                window.addEventListener('resize', this.RepositionSelf.bind(this));
            }
            /**
             * Wypełnia listę języków
             * @param q_id Identyfikator w Wikidanych
             * @param languages Lista nazw w innych językach
             */
            LangList.prototype.Populate = function (q_id, languages) {
                return __awaiter(this, void 0, void 0, function () {
                    var _a, _b;
                    return __generator(this, function (_c) {
                        switch (_c.label) {
                            case 0:
                                this.View.SetWikidataElement(q_id);
                                _b = (_a = this.View).PopulateLanguagesList;
                                return [4 /*yield*/, languages];
                            case 1:
                                _b.apply(_a, [_c.sent()]);
                                this.RepositionSelf();
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Wyświetla selektor języków "przypięty" do danego linku
             * @param anchor Ikonka "Wikidane", do której należy przypiąć panel
             */
            LangList.prototype.Display = function (anchor) {
                this.CurrentAnchor = anchor;
                this.Wrapper.style.display = 'block';
                this.RepositionSelf();
            };
            /**
             * Ukrywa selektor języków
             */
            LangList.prototype.Hide = function () {
                this.CurrentAnchor = null;
                this.Wrapper.style.display = 'none';
                this.View.PrepareForNextDisplay();
            };
            /**
             * Zwraca prostokąt, okalający selektor. Dodaje margines przekazany w parametrze
             * @param margin Margines, który jest uznawany za należący do selektora
             */
            LangList.prototype.GetBoundingClientRect = function (margin) {
                if (margin === void 0) { margin = 16; }
                if (this.CurrentAnchor === null) {
                    return new DOMRect(0, 0, 0, 0);
                }
                var anchor_rect = this.CurrentAnchor.getBoundingClientRect();
                var selector_rect = this.Wrapper.getBoundingClientRect();
                var leftmost = Math.min(anchor_rect.left, selector_rect.left) - margin;
                var rightmost = Math.max(anchor_rect.right, selector_rect.right) + margin;
                var topmost = Math.min(anchor_rect.top, selector_rect.top) - margin;
                var bottommost = Math.max(anchor_rect.bottom, selector_rect.bottom) + margin;
                return new DOMRect(leftmost, topmost, rightmost - leftmost, bottommost - topmost);
            };
            /**
             * Ustawia panel w taki sposób, by przylegał do ikonki "Wikidane"
             */
            LangList.prototype.RepositionSelf = function () {
                if (this.CurrentAnchor === null)
                    return;
                var margin = 16; // Odległość od brzegów okna, której panel nie powinien przekroczyć
                var horz_offset = 16; // Poziome przesunięcie brzegu panelu względem brzegu ikonki "Wikidane"
                var scroll_offset = -document.body.getBoundingClientRect().top;
                var anchor_rect = this.CurrentAnchor.getBoundingClientRect();
                var own_rect = this.Wrapper.getBoundingClientRect();
                // Domyślnie panel wyświetla się pod ikonką i "w prawo"
                var top = anchor_rect.bottom;
                var left = anchor_rect.left - horz_offset;
                if (top + own_rect.height > window.innerHeight - margin) {
                    // Trzeba panel ułożyć powyżej
                    top = Math.max(anchor_rect.top - own_rect.height, margin);
                }
                if (left + own_rect.width > window.innerWidth - margin) {
                    // Trzeba panel ułożyć "w lewo"
                    left = Math.max(anchor_rect.right - own_rect.width + horz_offset, margin);
                }
                this.Wrapper.style.top = (scroll_offset + top) + 'px';
                this.Wrapper.style.left = left + 'px';
                // Jeśli ikonka "Wikidane" wyszła poza ekran, ukryj
                if (anchor_rect.bottom < 0 || anchor_rect.top > window.innerHeight)
                    this.Hide();
                if (anchor_rect.right < 0 || anchor_rect.left > window.innerWidth)
                    this.Hide();
            };
            return LangList;
        }());
        InterwikiLanglist.LangList = LangList;
    })(InterwikiLanglist = Msz2001.InterwikiLanglist || (Msz2001.InterwikiLanglist = {}));
})(Msz2001 || (Msz2001 = {}));
var Msz2001;
(function (Msz2001) {
    var InterwikiLanglist;
    (function (InterwikiLanglist) {
        /** Klasa zarządzająca zawartością listy języków */
        var LangListView = /** @class */ (function () {
            function LangListView(wrapper) {
                var header = document.createElement('header');
                header.textContent = 'Dostępne języki';
                wrapper.appendChild(header);
                this.LanguagesList = document.createElement('ul');
                wrapper.appendChild(this.LanguagesList);
                this.NoLinks = document.createElement('div');
                this.NoLinks.classList.add('no-links-notice');
                this.NoLinks.textContent = 'Ten artykuł nie istnieje jeszcze w żadnym języku';
                wrapper.appendChild(this.NoLinks);
                this.Loading = document.createElement('div');
                this.Loading.classList.add('loading-notice');
                this.Loading.textContent = 'Wczytywanie...';
                wrapper.appendChild(this.Loading);
                var footer = document.createElement('footer');
                footer.textContent = 'Pobrano z ';
                wrapper.appendChild(footer);
                this.WikidataLink = document.createElement('a');
                this.WikidataLink.textContent = 'elementu Wikidanych';
                this.WikidataLink.href = 'https://wikidata.org';
                footer.appendChild(this.WikidataLink);
                this.PrepareForNextDisplay();
            }
            /**
             * Ustawia link do powiązanego elementu Wikidanych
             * @param q_id Identyfikator elementu Wikidanych
             */
            LangListView.prototype.SetWikidataElement = function (q_id) {
                this.WikidataLink.href = "https://www.wikidata.org/wiki/Special:EntityData/" + q_id;
            };
            /**
             * Wypełnia listę linków do wersji językowych
             * @param sitelinks Tablica linków do innych wersji językowych
             */
            LangListView.prototype.PopulateLanguagesList = function (sitelinks) {
                var e_1, _a;
                this.LanguagesList.innerText = '';
                var processed_links = this.SortAndFilterLinks(sitelinks);
                var hidden_li = [];
                try {
                    for (var processed_links_1 = __values(processed_links), processed_links_1_1 = processed_links_1.next(); !processed_links_1_1.done; processed_links_1_1 = processed_links_1.next()) {
                        var sitelink = processed_links_1_1.value;
                        var li = document.createElement('li');
                        li.innerHTML = "<a href=\"" + this.BuildUrl(sitelink) + "\">" + sitelink.LanguageName + "</a>";
                        var badge_title = '';
                        switch (sitelink.Badge) {
                            case InterwikiLanglist.Badge.AnM:
                                li.classList.add('badge-anm');
                                badge_title = ' – artykuł na medal';
                                break;
                            case InterwikiLanglist.Badge.LnM:
                                li.classList.add('badge-lnm');
                                badge_title = ' – lista na medal';
                                break;
                            case InterwikiLanglist.Badge.DA:
                                li.classList.add('badge-da');
                                badge_title = ' – dobry artykuł';
                                break;
                        }
                        li.title = sitelink.Title + badge_title;
                        this.LanguagesList.appendChild(li);
                        if (!sitelink.IsRecommended && processed_links.length > 10) {
                            hidden_li.push(li);
                            li.style.display = 'none';
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (processed_links_1_1 && !processed_links_1_1.done && (_a = processed_links_1.return)) _a.call(processed_links_1);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                // Dodaj link "pokaż wszystkie"
                if (hidden_li.length > 0) {
                    var li_1 = document.createElement('li');
                    var a = document.createElement('a');
                    a.href = 'javascript:void(0)';
                    a.innerText = 'pokaż więcej';
                    li_1.appendChild(a);
                    li_1.appendChild(document.createTextNode(" (" + hidden_li.length + " ukrytych)"));
                    this.LanguagesList.appendChild(li_1);
                    a.addEventListener('click', function () {
                        var e_2, _a;
                        try {
                            for (var hidden_li_1 = __values(hidden_li), hidden_li_1_1 = hidden_li_1.next(); !hidden_li_1_1.done; hidden_li_1_1 = hidden_li_1.next()) {
                                var elem = hidden_li_1_1.value;
                                elem.style.display = '';
                            }
                        }
                        catch (e_2_1) { e_2 = { error: e_2_1 }; }
                        finally {
                            try {
                                if (hidden_li_1_1 && !hidden_li_1_1.done && (_a = hidden_li_1.return)) _a.call(hidden_li_1);
                            }
                            finally { if (e_2) throw e_2.error; }
                        }
                        li_1.remove();
                    });
                }
                if (processed_links.length == 0) {
                    this.NoLinks.style.display = '';
                }
                else {
                    this.LanguagesList.style.display = '';
                }
                this.Loading.style.display = 'none';
            };
            /**
             * Przygotowuje listę języków do pokazania na innym elemencie
             * (tj. opróżnia ją i pokazuje ikonę ładowania).
             */
            LangListView.prototype.PrepareForNextDisplay = function () {
                this.LanguagesList.innerText = '';
                this.LanguagesList.style.display = 'none';
                this.NoLinks.style.display = 'none';
                this.Loading.style.display = '';
            };
            /**
             * Tworzy adres URL odpowiadający linkowi
             * @param sitelink Obiekt, reprezentujący link do projektu Wikimedia
             */
            LangListView.prototype.BuildUrl = function (sitelink) {
                var encoded_title = encodeURI(sitelink.Title.replace(' ', '_'));
                return "//" + sitelink.LanguageCode + ".wikipedia.org/wiki/" + encoded_title;
            };
            /**
             * Zwraca wyświetlaną nazwę języka, w którym jest treść pod linkiem
             * @param sitelink Obiekt, reprezentujący link do projektu Wikimedia
             */
            LangListView.prototype.GetLanguageDisplayName = function (sitelink) {
                var _a, _b, _c;
                //@ts-ignore - $.uls nie istnieje w definicjach :(
                return (_c = (_b = (_a = $ === null || $ === void 0 ? void 0 : $.uls) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.getAutonym(sitelink.LanguageCode)) !== null && _c !== void 0 ? _c : sitelink.LanguageCode;
            };
            /**
             * Odfiltrowuje linki do innych projektów niż Wikipedia. Sortuje je
             * według odznaczeń oraz preferencji użytkownika, odczytanych z ULS
             * @param sitelinks Tablica linków do innych języków
             */
            LangListView.prototype.SortAndFilterLinks = function (sitelinks) {
                var e_3, _a;
                var _b, _c;
                //@ts-ignore - mw.uls nie istnieje w definicjach :(
                var recommended_langs = new Set((_c = (_b = mw === null || mw === void 0 ? void 0 : mw.uls) === null || _b === void 0 ? void 0 : _b.getFrequentLanguageList()) !== null && _c !== void 0 ? _c : []);
                var processed_anm = [];
                var processed_lnm = [];
                var processed_da = [];
                var processed_nobadge = [];
                try {
                    for (var sitelinks_1 = __values(sitelinks), sitelinks_1_1 = sitelinks_1.next(); !sitelinks_1_1.done; sitelinks_1_1 = sitelinks_1.next()) {
                        var sitelink = sitelinks_1_1.value;
                        // Id innych projektów zawiera dopisek po "wiki"
                        if (!sitelink.Site.endsWith('wiki'))
                            continue;
                        if (sitelink.Site == 'commonswiki'
                            || sitelink.Site == 'metawiki'
                            || sitelink.Site == 'wikidatawiki')
                            continue;
                        var processed_link = {
                            Title: sitelink.Title,
                            LanguageCode: sitelink.LanguageCode,
                            LanguageName: this.GetLanguageDisplayName(sitelink),
                            IsRecommended: recommended_langs.has(sitelink.LanguageCode),
                            Badge: sitelink.Badge
                        };
                        switch (processed_link.Badge) {
                            case InterwikiLanglist.Badge.AnM:
                                processed_anm.push(processed_link);
                                break;
                            case InterwikiLanglist.Badge.LnM:
                                processed_lnm.push(processed_link);
                                break;
                            case InterwikiLanglist.Badge.DA:
                                processed_da.push(processed_link);
                                break;
                            default:
                                processed_nobadge.push(processed_link);
                                break;
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (sitelinks_1_1 && !sitelinks_1_1.done && (_a = sitelinks_1.return)) _a.call(sitelinks_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                return processed_anm.concat(processed_lnm, processed_da, processed_nobadge);
            };
            return LangListView;
        }());
        InterwikiLanglist.LangListView = LangListView;
    })(InterwikiLanglist = Msz2001.InterwikiLanglist || (Msz2001.InterwikiLanglist = {}));
})(Msz2001 || (Msz2001 = {}));
var Msz2001;
(function (Msz2001) {
    var InterwikiLanglist;
    (function (InterwikiLanglist) {
        var Badge;
        (function (Badge) {
            Badge[Badge["None"] = 0] = "None";
            Badge[Badge["AnM"] = 1] = "AnM";
            Badge[Badge["DA"] = 2] = "DA";
            Badge[Badge["LnM"] = 3] = "LnM";
        })(Badge = InterwikiLanglist.Badge || (InterwikiLanglist.Badge = {}));
        /** Udostępnia interfejs do Wikidanych */
        var WikidataClient = /** @class */ (function () {
            function WikidataClient() {
            }
            /**
             * Zwraca listę linków do innych wersji językowych
             * @param q_id Identyfikator elementu w Wikidanych
             */
            WikidataClient.GetSitelinks = function (q_id) {
                return __awaiter(this, void 0, void 0, function () {
                    var cached, sitelinks, _a, _b, _c;
                    return __generator(this, function (_d) {
                        switch (_d.label) {
                            case 0:
                                cached = this.SitelinkCache.get(q_id);
                                if (cached !== undefined)
                                    return [2 /*return*/, cached];
                                sitelinks = this.FetchSitelinks(q_id);
                                _b = (_a = this.SitelinkCache).set;
                                _c = [q_id];
                                return [4 /*yield*/, sitelinks];
                            case 1:
                                _b.apply(_a, _c.concat([_d.sent()]));
                                return [2 /*return*/, sitelinks];
                        }
                    });
                });
            };
            /**
             * Pobiera listę linków do innych wersji językowych z Wikidanych
             * @param q_id Identyfikator elementu w Wikidanych
             */
            WikidataClient.FetchSitelinks = function (q_id) {
                return new Promise(function (resolve, reject) {
                    var params = {
                        action: 'wbgetentities',
                        ids: q_id,
                        props: 'sitelinks'
                    };
                    var api = new mw.ForeignApi('https://www.wikidata.org/w/api.php');
                    api.get(params).done(function (data) {
                        var entity = data.entities[q_id];
                        resolve(WikidataClient.ParseSitelinks(entity.sitelinks));
                    }).catch(function (err) {
                        reject(err);
                    });
                });
            };
            /**
             * Przetwarza odpowiedź API Wikidanych i zwraca listę linków do innych wersji językowych
             * @param raw Obiekt sitelinks, pochodzący z API do Wikidanych
             */
            WikidataClient.ParseSitelinks = function (raw) {
                var _a, _b, _c;
                if (typeof raw !== 'object')
                    return [];
                var links = [];
                for (var wiki_id in raw) {
                    var sitelink = raw[wiki_id];
                    if (!('site' in sitelink) || typeof sitelink.site !== 'string')
                        continue;
                    if (!('title' in sitelink) || typeof sitelink.title !== 'string')
                        continue;
                    var wiki_pos = sitelink.site.lastIndexOf('wiki');
                    var lang_code = sitelink.site.substr(0, wiki_pos);
                    var badge = Badge.None;
                    if ((_a = sitelink.badges) === null || _a === void 0 ? void 0 : _a.includes('Q17437798'))
                        badge = Badge.DA;
                    if ((_b = sitelink.badges) === null || _b === void 0 ? void 0 : _b.includes('Q17506997'))
                        badge = Badge.LnM;
                    if ((_c = sitelink.badges) === null || _c === void 0 ? void 0 : _c.includes('Q17437796'))
                        badge = Badge.AnM;
                    links.push({
                        Title: sitelink.title,
                        Site: sitelink.site,
                        LanguageCode: lang_code,
                        Badge: badge
                    });
                }
                return links;
            };
            /** Przechowuje wcześniej pobrane linki. Czyszczone przy przeładowaniu strony */
            WikidataClient.SitelinkCache = new Map();
            return WikidataClient;
        }());
        InterwikiLanglist.WikidataClient = WikidataClient;
    })(InterwikiLanglist = Msz2001.InterwikiLanglist || (Msz2001.InterwikiLanglist = {}));
})(Msz2001 || (Msz2001 = {}));
$(function () {
    var e_4, _a;
    // Wyszukaj interwiki do Wikidanych
    var wd_links = document.querySelectorAll('.link-interwiki-wd');
    var langlist = new Msz2001.InterwikiLanglist.LangList();
    var _loop_1 = function (wd_link) {
        var e_5, _b;
        if (!(wd_link instanceof HTMLElement))
            return "continue";
        // Znajdź link i wyciągnij z niego identyfikator elementu
        var q_id = '';
        try {
            for (var _c = (e_5 = void 0, __values(wd_link.children)), _d = _c.next(); !_d.done; _d = _c.next()) {
                var child = _d.value;
                if (!(child instanceof HTMLAnchorElement))
                    continue;
                if (child.href.indexOf('wikidata.org') < 0)
                    continue;
                var q_pos = child.href.lastIndexOf('/Q');
                q_id = child.href.substr(q_pos + 1);
                // Wyłącz link do Wikidanych i zastąp ikonkę bardziej czytelnym symbolem
                child.href = 'javascript:void(0)';
                child.title = 'Zobacz, w jakich językach ten artykuł istnieje';
                child.style.cursor = 'auto';
                child.style.textDecoration = 'none';
                child.style.fontSize = '0.8em';
                child.textContent = '字';
            }
        }
        catch (e_5_1) { e_5 = { error: e_5_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_b = _c.return)) _b.call(_c);
            }
            finally { if (e_5) throw e_5.error; }
        }
        // Po najechaniu ikonki "Wikidane", pokaż panel z językami
        wd_link.addEventListener('mouseenter', function () {
            var sitelinks = Msz2001.InterwikiLanglist.WikidataClient.GetSitelinks(q_id);
            langlist.Populate(q_id, sitelinks);
            langlist.Display(wd_link);
        });
    };
    try {
        for (var wd_links_1 = __values(wd_links), wd_links_1_1 = wd_links_1.next(); !wd_links_1_1.done; wd_links_1_1 = wd_links_1.next()) {
            var wd_link = wd_links_1_1.value;
            _loop_1(wd_link);
        }
    }
    catch (e_4_1) { e_4 = { error: e_4_1 }; }
    finally {
        try {
            if (wd_links_1_1 && !wd_links_1_1.done && (_a = wd_links_1.return)) _a.call(wd_links_1);
        }
        finally { if (e_4) throw e_4.error; }
    }
    if (wd_links.length > 0) {
        // Służy do ukrywania selektora języków
        document.addEventListener('mousemove', function (ev) {
            var selector_rect = langlist.GetBoundingClientRect();
            var is_out_X = ev.clientX < selector_rect.left || ev.clientX > selector_rect.right;
            var is_out_Y = ev.clientY < selector_rect.top || ev.clientY > selector_rect.bottom;
            if (is_out_X || is_out_Y)
                langlist.Hide();
        });
        // Jeśli za blisko jednej z krawędzi, przesuń się
        var scrolling_1 = false;
        window.addEventListener('scroll', function () {
            // Ogranicza częstotliwość przeliczania położenia
            if (!scrolling_1) {
                window.requestAnimationFrame(function () {
                    langlist.RepositionSelf();
                    scrolling_1 = false;
                });
            }
            scrolling_1 = true;
        });
    }
});
