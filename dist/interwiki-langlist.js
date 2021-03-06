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
        var langs = {};
        /**
         * Zwraca polsk?? nazw?? j??zyka dla podanego kodu
         * @param code Kod j??zyka
         */
        function GetLanguageName(code) {
            if (langs[code] !== undefined)
                return langs[code];
            return code;
        }
        InterwikiLanglist.GetLanguageName = GetLanguageName;
        /**
         * Pobiera list?? j??zyk??w z serwera lub z pami??ci podr??cznej
         */
        function LoadLanguageNames() {
            // 7 dni * 24 godzin * 60 minut * 60 sekund * 1000 ms = 604 800 000
            var CACHE_TIME = 604800000;
            // Spr??buj odczyta?? j??zyki z pami??ci podr??cznej
            try {
                var storage = window.localStorage;
                if (storage) {
                    var fetchDate = storage.getItem('InterwikiLanglist.languages.fetchDate');
                    if (fetchDate) {
                        var now = Date.now();
                        if (now - parseInt(fetchDate) <= CACHE_TIME) {
                            var data = storage.getItem('InterwikiLanglist.languages.list');
                            if (data) {
                                langs = JSON.parse(data);
                                return;
                            }
                        }
                    }
                }
            }
            catch (e) {
                console.warn('[InterwikiLanglist] Error parsing storage data', e);
            }
            var xhr = new XMLHttpRequest();
            xhr.addEventListener('load', function () {
                try {
                    var data = JSON.parse(xhr.responseText);
                    var lang_info = data.query.languageinfo;
                    var languages = {};
                    for (var lang_code in lang_info) {
                        // Wikidane u??ywaj?? formatu z _, a API tu zwraca z my??lnikiem
                        languages[lang_code.replaceAll('-', '_')] = lang_info[lang_code].name;
                    }
                    // Zapisz dane do pami??ci podr??cznej
                    try {
                        var storage = window.localStorage;
                        if (storage) {
                            storage.setItem('InterwikiLanglist.languages.fetchDate', Date.now().toString());
                            storage.setItem('InterwikiLanglist.languages.list', JSON.stringify(languages));
                        }
                    }
                    catch (e) {
                        console.warn('[InterwikiLanglist] Error saving storage data', e);
                    }
                    langs = languages;
                }
                catch (e) {
                    console.warn('[InterwikiLanglist] Error loading languages from the server', e);
                }
            });
            xhr.open('GET', 'https://pl.wikipedia.org/w/api.php?action=query&format=json&meta=languageinfo&formatversion=2&liprop=name', true);
            xhr.send();
        }
        InterwikiLanglist.LoadLanguageNames = LoadLanguageNames;
    })(InterwikiLanglist = Msz2001.InterwikiLanglist || (Msz2001.InterwikiLanglist = {}));
})(Msz2001 || (Msz2001 = {}));
var Msz2001;
(function (Msz2001) {
    var InterwikiLanglist;
    (function (InterwikiLanglist) {
        var VisibilityChangeReason;
        (function (VisibilityChangeReason) {
            VisibilityChangeReason[VisibilityChangeReason["MouseMove"] = 0] = "MouseMove";
            VisibilityChangeReason[VisibilityChangeReason["KeyPress"] = 1] = "KeyPress";
            VisibilityChangeReason[VisibilityChangeReason["Scroll"] = 2] = "Scroll";
        })(VisibilityChangeReason = InterwikiLanglist.VisibilityChangeReason || (InterwikiLanglist.VisibilityChangeReason = {}));
        var LangList = /** @class */ (function () {
            function LangList() {
                /** Czy panel zosta?? automatycznie sfokusowany */
                this.AutoFocused = false;
                this.CurrentAnchor = null;
                this.CurrentRedLink = null;
                this.Backdrop = document.createElement('div');
                this.Backdrop.classList.add('interwiki-langlist-backdrop');
                document.body.appendChild(this.Backdrop);
                this.Wrapper = document.createElement('div');
                this.Wrapper.classList.add('interwiki-langlist-wrapper');
                document.body.insertBefore(this.Wrapper, this.Backdrop);
                this.View = new InterwikiLanglist.LangListView(this.Wrapper);
                window.addEventListener('resize', this.RepositionSelf.bind(this));
            }
            Object.defineProperty(LangList.prototype, "IsVisible", {
                /** Czy panel jest widoczny */
                get: function () {
                    return this.CurrentAnchor !== null;
                },
                enumerable: false,
                configurable: true
            });
            /**
             * Wype??nia list?? j??zyk??w
             * @param q_id Identyfikator w Wikidanych
             * @param response_awaiter Odpowied?? z Wikidanych
             * @param create_url Link do utworzenia artyku??u
             */
            LangList.prototype.Populate = function (response_awaiter, create_url) {
                return __awaiter(this, void 0, void 0, function () {
                    var response, e_1;
                    var _this = this;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                this.View.SetCreateUrl(create_url);
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 3, , 4]);
                                return [4 /*yield*/, response_awaiter];
                            case 2:
                                response = _a.sent();
                                if (response.QId !== null)
                                    this.View.SetWikidataElement(response.QId);
                                this.View.PopulateLanguagesList(response.Sitelinks, response.ArticleId.WikiId);
                                return [3 /*break*/, 4];
                            case 3:
                                e_1 = _a.sent();
                                this.View.DisplayLoadingError();
                                return [3 /*break*/, 4];
                            case 4:
                                window.requestAnimationFrame(function () {
                                    if (_this.AutoFocused)
                                        _this.View.FocusFirstLink();
                                    _this.RepositionSelf();
                                });
                                return [2 /*return*/];
                        }
                    });
                });
            };
            /**
             * Wy??wietla selektor j??zyk??w "przypi??ty" do danego linku
             * @param anchor Ikonka "Wikidane", do kt??rej nale??y przypi???? panel
             * @param reason Dlaczego nale??y pokaza?? element
             * @param red_link Czerwony link, powi??zany z panelem
             */
            LangList.prototype.Display = function (anchor, reason, red_link) {
                var _this = this;
                if (red_link === void 0) { red_link = null; }
                this.CurrentAnchor = anchor;
                this.AutoFocused = reason == VisibilityChangeReason.KeyPress;
                this.CurrentRedLink = red_link;
                window.requestAnimationFrame(function () {
                    _this.Wrapper.classList.add('shown');
                    _this.RepositionSelf();
                });
            };
            /**
             * Ukrywa selektor j??zyk??w
             * @param reason Pow??d ukrycia
             */
            LangList.prototype.Hide = function (reason) {
                var e_2, _a;
                // Je??li pokazano po klikni??ciu, ignoruj wyje??d??anie mysz??
                if (reason == VisibilityChangeReason.MouseMove
                    && this.AutoFocused)
                    return;
                // Przywr???? fokus do dokumentu
                if (this.AutoFocused && this.CurrentAnchor !== null) {
                    try {
                        for (var _b = __values(this.CurrentAnchor.children), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var child = _c.value;
                            if (child instanceof HTMLAnchorElement) {
                                child.focus();
                                break;
                            }
                        }
                    }
                    catch (e_2_1) { e_2 = { error: e_2_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_2) throw e_2.error; }
                    }
                    this.CurrentAnchor.focus();
                }
                this.CurrentAnchor = null;
                this.CurrentRedLink = null;
                this.Wrapper.classList.remove('shown');
                this.View.PrepareForNextDisplay();
            };
            /**
             * Zwraca prostok??t, okalaj??cy selektor. Dodaje margines przekazany w parametrze
             * @param margin Margines, kt??ry jest uznawany za nale????cy do selektora
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
             * Ustawia panel w taki spos??b, by przylega?? do ikonki "Wikidane"
             */
            LangList.prototype.RepositionSelf = function () {
                if (this.CurrentAnchor === null)
                    return;
                var margin = 16; // Odleg??o???? od brzeg??w okna, kt??rej panel nie powinien przekroczy??
                var horz_offset = 16; // Poziome przesuni??cie brzegu panelu wzgl??dem brzegu ikonki "Wikidane"
                var anchor_rect = this.CurrentAnchor.getBoundingClientRect();
                var own_rect = this.Wrapper.getBoundingClientRect();
                // Domy??lnie panel wy??wietla si?? pod ikonk?? i "w prawo"
                var top = anchor_rect.bottom;
                var left = anchor_rect.left - horz_offset;
                if (top + own_rect.height > window.innerHeight - margin) {
                    // Trzeba panel u??o??y?? powy??ej
                    top = Math.max(anchor_rect.top - own_rect.height, margin);
                }
                if (left + own_rect.width > window.innerWidth - margin) {
                    // Trzeba panel u??o??y?? "w lewo"
                    left = Math.max(anchor_rect.right - own_rect.width + horz_offset, margin);
                }
                this.Wrapper.style.top = top + 'px';
                this.Wrapper.style.left = left + 'px';
                // Je??li ikonka "Wikidane" wysz??a poza ekran, ukryj
                if (anchor_rect.bottom < 0 || anchor_rect.top > window.innerHeight)
                    this.Hide(VisibilityChangeReason.Scroll);
                if (anchor_rect.right < 0 || anchor_rect.left > window.innerWidth)
                    this.Hide(VisibilityChangeReason.Scroll);
            };
            /**
             * Sprawdza, czy element nale??y do panelu lub kotwicy
             * @param element Element do sprawdzenia
             */
            LangList.prototype.IsElementRelatedToPanel = function (element) {
                var _a, _b;
                if (this.Wrapper.contains(element) || this.Wrapper === element)
                    return true;
                if (((_a = this.CurrentAnchor) === null || _a === void 0 ? void 0 : _a.contains(element)) || this.CurrentAnchor === element)
                    return true;
                if (((_b = this.CurrentRedLink) === null || _b === void 0 ? void 0 : _b.contains(element)) || this.CurrentRedLink === element)
                    return true;
                return false;
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
        /** Klasa zarz??dzaj??ca zawarto??ci?? listy j??zyk??w */
        var LangListView = /** @class */ (function () {
            function LangListView(wrapper) {
                var _this = this;
                this.CreateArticleWrapper = document.createElement('div');
                this.CreateArticleWrapper.classList.add('create-wrapper');
                this.CreateArticleWrapper.textContent = 'Tego artyku??u nie ma jeszcze w polskoj??zycznej Wikipedii. Mo??esz go utworzy??.';
                wrapper.appendChild(this.CreateArticleWrapper);
                this.CreateButton = document.createElement('a');
                this.CreateButton.classList.add('mw-ui-button', 'mw-ui-progressive');
                this.CreateButton.textContent = 'Utw??rz stron??';
                this.CreateArticleWrapper.appendChild(this.CreateButton);
                var header = document.createElement('header');
                header.textContent = 'Dost??pne j??zyki';
                wrapper.appendChild(header);
                this.LanguagesList = document.createElement('ul');
                wrapper.appendChild(this.LanguagesList);
                this.NoLinks = document.createElement('div');
                this.NoLinks.classList.add('notice');
                this.NoLinks.textContent = 'Ten artyku?? nie istnieje jeszcze w ??adnym j??zyku';
                wrapper.appendChild(this.NoLinks);
                this.Loading = document.createElement('div');
                this.Loading.classList.add('notice');
                this.Loading.textContent = 'Wczytywanie...';
                wrapper.appendChild(this.Loading);
                this.LoadingError = document.createElement('div');
                this.LoadingError.classList.add('notice');
                this.LoadingError.textContent = 'Nie uda??o si?? wczyta?? listy j??zyk??w';
                wrapper.appendChild(this.LoadingError);
                this.ListFooter = document.createElement('footer');
                this.ListFooter.textContent = 'Pobrano z ';
                wrapper.appendChild(this.ListFooter);
                this.WikidataLink = document.createElement('a');
                this.WikidataLink.textContent = 'elementu Wikidanych';
                this.WikidataLink.href = 'https://wikidata.org';
                this.WikidataLink.addEventListener('keydown', (function (e) {
                    // Po naci??ni??ciu klawisza Tab, przejd?? do pierwszego linku
                    if (e.code == 'Tab' && !e.shiftKey) {
                        _this.FocusFirstLink();
                        e.preventDefault();
                    }
                }).bind(this));
                this.ListFooter.appendChild(this.WikidataLink);
                wrapper.addEventListener('keydown', (function (e) {
                    // Po naci??ni??ciu klawisza Shift+Tab, przejd?? do ostatniego linku
                    if (e.code == 'Tab' && e.shiftKey) {
                        _this.MoveFocusToEndIfNeeded(e);
                    }
                }).bind(this));
                this.PrepareForNextDisplay();
            }
            /**
             * Ustawia link do powi??zanego elementu Wikidanych
             * @param q_id Identyfikator elementu Wikidanych
             */
            LangListView.prototype.SetWikidataElement = function (q_id) {
                this.WikidataLink.href = "https://www.wikidata.org/wiki/Special:EntityData/" + q_id;
                this.ListFooter.style.display = '';
            };
            /**
             * Ustawia adres docelowy przycisku "Utw??rz stron??"
             * @param url Adres URL, prowadz??cy do strony tworzenia artyku??u
             */
            LangListView.prototype.SetCreateUrl = function (url) {
                this.CreateButton.href = url !== null && url !== void 0 ? url : '#';
                if (url === undefined) {
                    this.CreateArticleWrapper.style.display = 'none';
                }
                else {
                    this.CreateArticleWrapper.style.display = '';
                }
            };
            /**
             * Wype??nia list?? link??w do wersji j??zykowych
             * @param sitelinks Tablica link??w do innych wersji j??zykowych
             * @param main_siteid Id projektu do oznaczenia jako g????wny
             */
            LangListView.prototype.PopulateLanguagesList = function (sitelinks, main_siteid) {
                var e_3, _a;
                this.LanguagesList.innerText = '';
                var processed_links = this.SortAndFilterLinks(sitelinks, main_siteid);
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
                                badge_title = ' ??? artyku?? na medal';
                                break;
                            case InterwikiLanglist.Badge.LnM:
                                li.classList.add('badge-lnm');
                                badge_title = ' ??? lista na medal';
                                break;
                            case InterwikiLanglist.Badge.DA:
                                li.classList.add('badge-da');
                                badge_title = ' ??? dobry artyku??';
                                break;
                        }
                        if (sitelink.IsMain) {
                            badge_title += ' (sugerowany przez autora)';
                            li.classList.add('suggested');
                        }
                        li.title = sitelink.Title + badge_title;
                        this.LanguagesList.appendChild(li);
                        if (!sitelink.IsRecommended && !sitelink.IsMain && processed_links.length > 10) {
                            hidden_li.push(li);
                            li.style.display = 'none';
                        }
                    }
                }
                catch (e_3_1) { e_3 = { error: e_3_1 }; }
                finally {
                    try {
                        if (processed_links_1_1 && !processed_links_1_1.done && (_a = processed_links_1.return)) _a.call(processed_links_1);
                    }
                    finally { if (e_3) throw e_3.error; }
                }
                // Dodaj link "poka?? wszystkie"
                if (hidden_li.length > 0) {
                    var li_1 = document.createElement('li');
                    var a = document.createElement('a');
                    a.href = 'javascript:void(0)';
                    a.innerText = 'poka?? wi??cej';
                    li_1.appendChild(a);
                    li_1.appendChild(document.createTextNode(" (" + hidden_li.length + " ukrytych)"));
                    this.LanguagesList.appendChild(li_1);
                    a.addEventListener('click', function (e) {
                        var e_4, _a;
                        try {
                            for (var hidden_li_1 = __values(hidden_li), hidden_li_1_1 = hidden_li_1.next(); !hidden_li_1_1.done; hidden_li_1_1 = hidden_li_1.next()) {
                                var elem = hidden_li_1_1.value;
                                elem.style.display = '';
                            }
                        }
                        catch (e_4_1) { e_4 = { error: e_4_1 }; }
                        finally {
                            try {
                                if (hidden_li_1_1 && !hidden_li_1_1.done && (_a = hidden_li_1.return)) _a.call(hidden_li_1);
                            }
                            finally { if (e_4) throw e_4.error; }
                        }
                        li_1.remove();
                        e.stopPropagation(); // Dzi??ki temu klikni??cie nie ukrywa panelu
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
             * Przygotowuje list?? j??zyk??w do pokazania na innym elemencie
             * (tj. opr????nia j?? i pokazuje ikon?? ??adowania).
             */
            LangListView.prototype.PrepareForNextDisplay = function () {
                this.LanguagesList.innerText = '';
                this.LanguagesList.style.display = 'none';
                this.ListFooter.style.display = 'none';
                this.NoLinks.style.display = 'none';
                this.LoadingError.style.display = 'none';
                this.Loading.style.display = '';
            };
            /**
             * Wy??wietla komunikat o b????dzie wczytywania danych
             */
            LangListView.prototype.DisplayLoadingError = function () {
                this.Loading.style.display = 'none';
                this.LoadingError.style.display = '';
            };
            /** Ustawia fokus na pierwszy link na li??cie */
            LangListView.prototype.FocusFirstLink = function () {
                var e_5, _a, e_6, _b;
                // Je??li przycisk "Utw??rz stron??" jest widoczny, ustaw na niego fokus
                var create_style = window.getComputedStyle(this.CreateArticleWrapper);
                if (create_style.getPropertyValue('display') != 'none') {
                    this.CreateButton.focus();
                    return;
                }
                try {
                    for (var _c = __values(this.LanguagesList.children), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var li = _d.value;
                        if (!(li instanceof HTMLElement))
                            continue;
                        if (li.style.display == 'none')
                            continue;
                        try {
                            for (var _e = (e_6 = void 0, __values(li.children)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var child = _f.value;
                                if (child instanceof HTMLAnchorElement) {
                                    child.focus();
                                    return;
                                }
                            }
                        }
                        catch (e_6_1) { e_6 = { error: e_6_1 }; }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                            }
                            finally { if (e_6) throw e_6.error; }
                        }
                    }
                }
                catch (e_5_1) { e_5 = { error: e_5_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_5) throw e_5.error; }
                }
                this.WikidataLink.focus();
            };
            /**
             * Je??li ostatnio sfokusowany by?? pierwszy link na li??cie, przenosi fokus na ostatni
             * @param e Zdarzenie naci??ni??cia klawisza. Zostaje anulowane, by przegl??darka nie przenosi??a fokusu
             */
            LangListView.prototype.MoveFocusToEndIfNeeded = function (e) {
                var _a, _b;
                // Je??li przycisk "Utw??rz stron??" jest widoczny, sprawd?? czy ma fokus
                var create_style = window.getComputedStyle(this.CreateArticleWrapper);
                if (create_style.getPropertyValue('display') != 'none') {
                    // Je??li "Utw??rz stron??" jest aktywny, ustaw fokus na koniec
                    if (document.activeElement == this.CreateButton) {
                        this.WikidataLink.focus();
                        e === null || e === void 0 ? void 0 : e.preventDefault();
                    }
                    else {
                        return;
                    }
                }
                if (!this.LanguagesList.contains(document.activeElement))
                    return;
                var li = (_b = (_a = document.activeElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.previousElementSibling;
                while (li !== null && li !== undefined) {
                    // Je??li poprzednik <li> jest widoczny, nic nie r??b
                    if (li.style.display != 'none')
                        return;
                    li = li.previousElementSibling;
                }
                this.WikidataLink.focus();
                e === null || e === void 0 ? void 0 : e.preventDefault();
            };
            /**
             * Tworzy adres URL odpowiadaj??cy linkowi
             * @param sitelink Obiekt, reprezentuj??cy link do projektu Wikimedia
             */
            LangListView.prototype.BuildUrl = function (sitelink) {
                var encoded_title = encodeURI(sitelink.Title.replace(' ', '_'));
                return "//" + sitelink.LanguageCode + ".wikipedia.org/wiki/" + encoded_title;
            };
            /**
             * Odfiltrowuje linki do innych projekt??w ni?? Wikipedia. Sortuje je
             * wed??ug odznacze?? oraz preferencji u??ytkownika, odczytanych z ULS
             * @param sitelinks Tablica link??w do innych j??zyk??w
             * @param main_siteid Id projektu do oznaczenia jako "g????wny"
             */
            LangListView.prototype.SortAndFilterLinks = function (sitelinks, main_siteid) {
                var e_7, _a;
                var _b, _c;
                //@ts-ignore - mw.uls nie istnieje w definicjach :(
                var recommended_langs = new Set((_c = (_b = mw === null || mw === void 0 ? void 0 : mw.uls) === null || _b === void 0 ? void 0 : _b.getFrequentLanguageList()) !== null && _c !== void 0 ? _c : []);
                // Upewnij si??, ??e w rekomendowanych j??zykach jest kilka wa??niejszych Wikipedii
                recommended_langs.add('en').add('de').add('fr').add('ru').add('es');
                var processed_anm = [];
                var processed_lnm = [];
                var processed_da = [];
                var processed_nobadge = [];
                try {
                    for (var sitelinks_1 = __values(sitelinks), sitelinks_1_1 = sitelinks_1.next(); !sitelinks_1_1.done; sitelinks_1_1 = sitelinks_1.next()) {
                        var sitelink = sitelinks_1_1.value;
                        // Id innych projekt??w zawiera dopisek po "wiki"
                        if (!sitelink.Site.endsWith('wiki'))
                            continue;
                        if (sitelink.Site == 'commonswiki'
                            || sitelink.Site == 'metawiki'
                            || sitelink.Site == 'wikidatawiki')
                            continue;
                        var processed_link = {
                            Title: sitelink.Title,
                            LanguageCode: sitelink.LanguageCode,
                            LanguageName: InterwikiLanglist.GetLanguageName(sitelink.LanguageCode),
                            IsRecommended: recommended_langs.has(sitelink.LanguageCode),
                            IsMain: sitelink.Site === main_siteid,
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
                catch (e_7_1) { e_7 = { error: e_7_1 }; }
                finally {
                    try {
                        if (sitelinks_1_1 && !sitelinks_1_1.done && (_a = sitelinks_1.return)) _a.call(sitelinks_1);
                    }
                    finally { if (e_7) throw e_7.error; }
                }
                var sitelink_comparer = function (a, b) {
                    var locale = 'pl';
                    var a_name = a.LanguageName.toLocaleLowerCase(locale);
                    var b_name = b.LanguageName.toLocaleLowerCase(locale);
                    return a_name.localeCompare(b_name, locale);
                };
                /* Posortuj alfabetycznie j??zyki */
                processed_anm.sort(sitelink_comparer);
                processed_lnm.sort(sitelink_comparer);
                processed_da.sort(sitelink_comparer);
                processed_nobadge.sort(sitelink_comparer);
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
        var ArticleId = /** @class */ (function () {
            function ArticleId(WikiId, Title) {
                this.WikiId = WikiId;
                this.Title = Title;
            }
            ArticleId.prototype.ToString = function () {
                return this.WikiId + "::" + this.Title;
            };
            ArticleId.WIKIDATA = 'wikidatawiki';
            return ArticleId;
        }());
        InterwikiLanglist.ArticleId = ArticleId;
        ;
        /** Udost??pnia interfejs do Wikidanych */
        var WikidataClient = /** @class */ (function () {
            function WikidataClient() {
            }
            /**
             * Zwraca list?? link??w do innych wersji j??zykowych
             * @param article_id Identyfikator artyku??u
             */
            WikidataClient.GetSitelinks = function (article_id) {
                return __awaiter(this, void 0, void 0, function () {
                    var cached, result;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                cached = this.SitelinkCache.get(article_id.ToString());
                                if (cached !== undefined)
                                    return [2 /*return*/, cached];
                                return [4 /*yield*/, this.FetchSitelinks(article_id)];
                            case 1:
                                result = _a.sent();
                                this.SitelinkCache.set(article_id.ToString(), result);
                                return [2 /*return*/, result];
                        }
                    });
                });
            };
            /**
             * Pobiera list?? link??w do innych wersji j??zykowych z Wikidanych
             * @param article Identyfikator artyku??u
             */
            WikidataClient.FetchSitelinks = function (article) {
                return new Promise(function (resolve, reject) {
                    // mw.ForeignApi nie istnieje u u??ytkownik??w niezalogowanych
                    // Dlatego ????danie trzeba zrealizowa?? "r??cznie"
                    var xhr = new XMLHttpRequest();
                    xhr.addEventListener('load', function () {
                        try {
                            var data = JSON.parse(xhr.responseText);
                            var entity = Object.entries(data.entities)[0];
                            var q_id = entity[0];
                            if (!q_id.startsWith('Q'))
                                q_id = null;
                            var sitelinks = WikidataClient.ParseSitelinks(entity[1].sitelinks);
                            if (sitelinks.length == 0 && article.WikiId != ArticleId.WIKIDATA) {
                                sitelinks = [WikidataClient.ArticleIdToSitelink(article)];
                            }
                            resolve({
                                ArticleId: article,
                                QId: q_id,
                                Sitelinks: sitelinks
                            });
                        }
                        catch (e) {
                            reject(e);
                        }
                    });
                    var title = article.Title.replace('&', '%26');
                    title = title.replace('=', '%3D');
                    var selector = "ids=" + title;
                    if (article.WikiId != ArticleId.WIKIDATA) {
                        selector = "sites=" + article.WikiId + "&titles=" + title;
                    }
                    xhr.addEventListener('error', function () { return reject(); });
                    xhr.open('GET', "https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&" + selector + "&origin=https%3A%2F%2F" + window.location.hostname + "&props=sitelinks", true);
                    xhr.send();
                });
            };
            /**
             * Przetwarza odpowied?? API Wikidanych i zwraca list?? link??w do innych wersji j??zykowych
             * @param raw Obiekt sitelinks, pochodz??cy z API do Wikidanych
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
            /**
             * Przetwarza id artyku??u na obiekt opisuj??cy link
             * @param article Id artyku??u
             */
            WikidataClient.ArticleIdToSitelink = function (article) {
                var wiki_pos = article.WikiId.lastIndexOf('wiki');
                var lang_code = article.WikiId.substr(0, wiki_pos);
                return {
                    Title: article.Title,
                    Site: article.WikiId,
                    LanguageCode: lang_code,
                    Badge: Badge.None
                };
            };
            /** Przechowuje wcze??niej pobrane linki. Czyszczone przy prze??adowaniu strony */
            WikidataClient.SitelinkCache = new Map();
            return WikidataClient;
        }());
        InterwikiLanglist.WikidataClient = WikidataClient;
    })(InterwikiLanglist = Msz2001.InterwikiLanglist || (Msz2001.InterwikiLanglist = {}));
})(Msz2001 || (Msz2001 = {}));
var Msz2001;
(function (Msz2001) {
    var InterwikiLanglist;
    (function (InterwikiLanglist) {
        /**
         * Wyszukuje hiper????cze do innego projektu Wikimedia wewn??trz elementu
         * @param iw_link_wrapper Wrapper linku interwiki
         */
        var extractInterwikiLink = function (iw_link_wrapper) {
            var e_8, _a, e_9, _b;
            var _c;
            if (!iw_link_wrapper.classList.contains('link-interwiki-wd')
                && iw_link_wrapper.parentElement instanceof HTMLAnchorElement) {
                // Je??eli wrapper jest wewn??trz linku, wyci??gnij go na zewn??trz
                var link = iw_link_wrapper.parentElement;
                (_c = link.parentElement) === null || _c === void 0 ? void 0 : _c.insertBefore(iw_link_wrapper, link);
                try {
                    // Przenie?? dzieci wrappera do linku
                    for (var _d = __values(iw_link_wrapper.childNodes), _e = _d.next(); !_e.done; _e = _d.next()) {
                        var child = _e.value;
                        link.appendChild(child);
                    }
                }
                catch (e_8_1) { e_8 = { error: e_8_1 }; }
                finally {
                    try {
                        if (_e && !_e.done && (_a = _d.return)) _a.call(_d);
                    }
                    finally { if (e_8) throw e_8.error; }
                }
                iw_link_wrapper.appendChild(link);
                return link;
            }
            try {
                for (var _f = __values(iw_link_wrapper.children), _g = _f.next(); !_g.done; _g = _f.next()) {
                    var child = _g.value;
                    if (child instanceof HTMLAnchorElement)
                        return child;
                }
            }
            catch (e_9_1) { e_9 = { error: e_9_1 }; }
            finally {
                try {
                    if (_g && !_g.done && (_b = _f.return)) _b.call(_f);
                }
                finally { if (e_9) throw e_9.error; }
            }
            return null;
        };
        /**
         * Wyci??ga identyfikator artyku??u z linku
         * @param iw_link Hiper????cze interwiki
         */
        var extractArticleId = function (iw_link) {
            var title_prefix = '.org/wiki/';
            var title_prefix_pos = iw_link.href.indexOf(title_prefix);
            if (title_prefix_pos < 0)
                return null;
            var title_pos = title_prefix_pos + title_prefix.length;
            var title = iw_link.href.substr(title_pos);
            //(j??zyk).wikipedia.org/ poprzedzone opcjonalnie "m." i/lub "www."
            var match = /\/\/(?:www.)?(?:m.)?([^.]+)\.wikipedia\.org\//i.exec(iw_link.href);
            var lang = match === null || match === void 0 ? void 0 : match[1];
            if (lang !== undefined) {
                return new InterwikiLanglist.ArticleId(lang + 'wiki', title);
            }
            // Sprawd??, czy link prowadzi do Wikidanych
            if (iw_link.href.indexOf('wikidata.org') >= 0) {
                return new InterwikiLanglist.ArticleId(InterwikiLanglist.ArticleId.WIKIDATA, title);
            }
            return null;
        };
        $(function () {
            var e_10, _a;
            var _b;
            InterwikiLanglist.LoadLanguageNames();
            // Wyszukaj interwiki wstawione za pomoc?? {link-interwiki}
            var iw_link_wrappers = document.querySelectorAll('.link-interwiki');
            var langlist = new InterwikiLanglist.LangList();
            var _loop_1 = function (iw_link_wrapper) {
                if (!(iw_link_wrapper instanceof HTMLElement))
                    return "continue";
                // Znajd?? link; je??li nie istnieje, to pomi?? iteracj??
                var interwiki_link = extractInterwikiLink(iw_link_wrapper);
                if (interwiki_link === null)
                    return "continue";
                var article_id = extractArticleId(interwiki_link);
                if (article_id === null)
                    return "continue";
                // Wy????cz link interwiki i zast??p go symbolem wyboru j??zyka
                interwiki_link.href = 'javascript:void(0)';
                interwiki_link.title = 'Zobacz, w jakich j??zykach ten artyku?? istnieje';
                interwiki_link.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/4/45/Translate_link_color_crop.svg" alt="[w innych j??zykach]" width="12" />';
                var red_link;
                if (iw_link_wrapper.previousElementSibling instanceof HTMLAnchorElement) {
                    red_link = iw_link_wrapper.previousElementSibling;
                }
                var is_minerva = document.body.classList.contains('skin-minerva');
                if (is_minerva && red_link !== undefined) {
                    // Utw??rz nowy link, by usun???? procedury obs??ugi zdarze??,
                    // m.in. odpowiadaj??ce za wy??wietlenia okna proponuj??cego stworzenie strony
                    var cloned_link = red_link.cloneNode(true);
                    (_b = red_link.parentElement) === null || _b === void 0 ? void 0 : _b.insertBefore(cloned_link, red_link);
                    red_link.remove();
                    red_link = cloned_link;
                }
                var display_langlist = function (reason, e) {
                    if (langlist.IsVisible)
                        return;
                    var result = InterwikiLanglist.WikidataClient.GetSitelinks(article_id);
                    langlist.Display(iw_link_wrapper, reason, red_link);
                    langlist.Populate(result, red_link === null || red_link === void 0 ? void 0 : red_link.href);
                    e === null || e === void 0 ? void 0 : e.preventDefault();
                };
                // Klikni??cie ikonk?? pokazuje panel j??zyk??w
                interwiki_link === null || interwiki_link === void 0 ? void 0 : interwiki_link.addEventListener('click', function (e) { return display_langlist(InterwikiLanglist.VisibilityChangeReason.KeyPress, e); });
                // Poza sk??rk?? Minerva, panel pokazuje si?? r??wnie?? po najechaniu na ikonk??
                // W Minervie z kolei, mo??na klikn???? r??wnie?? na czerwony link
                if (!is_minerva) {
                    iw_link_wrapper.addEventListener('mouseenter', function () { return display_langlist(InterwikiLanglist.VisibilityChangeReason.MouseMove); });
                }
                else {
                    red_link === null || red_link === void 0 ? void 0 : red_link.addEventListener('click', function (e) { return display_langlist(InterwikiLanglist.VisibilityChangeReason.KeyPress, e); });
                }
            };
            try {
                for (var iw_link_wrappers_1 = __values(iw_link_wrappers), iw_link_wrappers_1_1 = iw_link_wrappers_1.next(); !iw_link_wrappers_1_1.done; iw_link_wrappers_1_1 = iw_link_wrappers_1.next()) {
                    var iw_link_wrapper = iw_link_wrappers_1_1.value;
                    _loop_1(iw_link_wrapper);
                }
            }
            catch (e_10_1) { e_10 = { error: e_10_1 }; }
            finally {
                try {
                    if (iw_link_wrappers_1_1 && !iw_link_wrappers_1_1.done && (_a = iw_link_wrappers_1.return)) _a.call(iw_link_wrappers_1);
                }
                finally { if (e_10) throw e_10.error; }
            }
            if (iw_link_wrappers.length > 0) {
                // S??u??y do ukrywania selektora j??zyk??w
                document.addEventListener('mousemove', function (ev) {
                    if (!langlist.IsVisible)
                        return;
                    var selector_rect = langlist.GetBoundingClientRect();
                    var is_out_X = ev.clientX < selector_rect.left || ev.clientX > selector_rect.right;
                    var is_out_Y = ev.clientY < selector_rect.top || ev.clientY > selector_rect.bottom;
                    if (is_out_X || is_out_Y)
                        langlist.Hide(InterwikiLanglist.VisibilityChangeReason.MouseMove);
                });
                document.addEventListener('keydown', function (e) {
                    if (e.code != 'Escape')
                        return;
                    langlist.Hide(InterwikiLanglist.VisibilityChangeReason.KeyPress);
                });
                // Je??li za blisko jednej z kraw??dzi, przesu?? si??
                var scrolling_1 = false;
                window.addEventListener('scroll', function () {
                    // Ogranicza cz??stotliwo???? przeliczania po??o??enia
                    if (!scrolling_1) {
                        window.requestAnimationFrame(function () {
                            langlist.RepositionSelf();
                            scrolling_1 = false;
                        });
                    }
                    scrolling_1 = true;
                });
                // Klikni??cie poza list?? j??zyk??w ukrywa j??
                window.addEventListener('click', function (e) {
                    if (!langlist.IsVisible)
                        return;
                    if (!(e.target instanceof HTMLElement))
                        return;
                    if (langlist.IsElementRelatedToPanel(e.target))
                        return;
                    langlist.Hide(InterwikiLanglist.VisibilityChangeReason.KeyPress);
                });
            }
        });
    })(InterwikiLanglist = Msz2001.InterwikiLanglist || (Msz2001.InterwikiLanglist = {}));
})(Msz2001 || (Msz2001 = {}));
