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
        var langs = {
            "aa": "afar",
            "ab": "abchaski",
            "ace": "aceh",
            "ady": "adygejski",
            "af": "afrykanerski",
            "ak": "akan",
            "als": "alemański",
            "am": "amharski",
            "an": "aragoński",
            "ang": "staroangielski",
            "anp": "angika",
            "ar": "arabski",
            "arc": "aramejski",
            "arz": "arabski (Egipt)",
            "as": "asamski",
            "ast": "asturyjski",
            "av": "awarski",
            "ay": "ajmara",
            "az": "azerski",
            "azb": "południowoazerski",
            "ba": "baszkirski",
            "ban": "balijski",
            "bar": "bawarski",
            "bat_smg": "żmudzki",
            "bcl": "środkowy bikolski",
            "be": "białoruski",
            "be_x_old": "białoruski (taraszkiewica)",
            "bg": "bułgarski",
            "bh": "bihari",
            "bi": "bislama",
            "bjn": "bandżarski",
            "bm": "bambara",
            "bn": "bengalski",
            "bo": "tybetański",
            "bpy": "bisznuprija-manipuri",
            "br": "bretoński",
            "bs": "bośniacki",
            "bug": "bugijski",
            "bxr": "buriacki",
            "ca": "kataloński",
            "cbk_zam": "chavacano",
            "cdo": "mindong",
            "ce": "czeczeński",
            "ceb": "cebuano",
            "ch": "czamorro",
            "cho": "czoktaw",
            "chr": "czirokeski",
            "chy": "czejeński",
            "ckb": "sorani",
            "co": "korsykański",
            "cr": "kri",
            "crh": "krymskotatarski",
            "cs": "czeski",
            "csb": "kaszubski",
            "cu": "staro-cerkiewno-słowiański",
            "cv": "czuwaski",
            "cy": "walijski",
            "da": "duński",
            "de": "niemiecki",
            "diq": "zazaki",
            "dsb": "dolnołużycki",
            "dv": "malediwski",
            "dz": "dzongkha",
            "ee": "ewe",
            "el": "nowogrecki",
            "eml": "emilijski",
            "en": "angielski",
            "eo": "esperanto",
            "es": "hiszpański",
            "et": "estoński",
            "eu": "baskijski",
            "ext": "estremadurski",
            "fa": "perski",
            "ff": "ful",
            "fi": "fiński",
            "fiu_vro": "võro",
            "fj": "fidżyjski",
            "fo": "farerski",
            "fr": "francuski",
            "frp": "franko-prowansalski",
            "frr": "północnofryzyjski",
            "fur": "friulski",
            "fy": "fryzyjski",
            "ga": "irlandzki",
            "gag": "gagauski",
            "gan": "gan",
            "gd": "gaelicki szkocki",
            "gl": "galicyjski",
            "glk": "giliański",
            "gn": "guarani",
            "gom": "konkani",
            "got": "gocki",
            "gu": "gudźarati",
            "gv": "manx",
            "ha": "hausa",
            "hak": "hakka",
            "haw": "hawajski",
            "he": "hebrajski",
            "hi": "hindi",
            "hif": "hindi fidżyjskie",
            "ho": "hiri motu",
            "hr": "chorwacki",
            "hsb": "górnołużycki",
            "ht": "haitański",
            "hu": "węgierski",
            "hy": "ormiański",
            "hz": "herero",
            "ia": "interlingua",
            "id": "indonezyjski",
            "ie": "occidental",
            "ig": "igbo",
            "ii": "nuosu",
            "ik": "inupiak",
            "ilo": "ilokano",
            "io": "ido",
            "is": "islandzki",
            "it": "włoski",
            "iu": "inuktitut",
            "ja": "japoński",
            "jbo": "lojban",
            "jv": "jawajski",
            "ka": "gruziński",
            "kaa": "karakałpacki",
            "kab": "kabylski",
            "kbd": "kabardyjski",
            "kg": "kongo",
            "ki": "kikuju",
            "kj": "kwanyama",
            "kk": "kazachski",
            "kl": "grenlandzki",
            "km": "khmerski",
            "kn": "kannada",
            "ko": "koreański",
            "koi": "komi-permiacki",
            "kr": "kanuri",
            "krc": "karaczajsko-bałkarski",
            "ks": "kaszmirski",
            "ksh": "rypuaryjski",
            "ku": "kurdysjki",
            "kv": "komi",
            "kw": "kornijski",
            "ky": "kirgiski",
            "la": "łaciński",
            "lad": "ladino",
            "lb": "luksemburski",
            "lbe": "lakijski",
            "lez": "lezgiński",
            "lg": "luganda",
            "li": "limburski",
            "lij": "liguryjski",
            "lmo": "lombardzki",
            "ln": "lingala",
            "lo": "laotański",
            "lrc": "luri",
            "lt": "litewski",
            "ltg": "łatgalski",
            "lv": "łotewski",
            "mad": "madurski",
            "mai": "maithili",
            "map_bms": "banjumasański",
            "mdf": "moksza",
            "mg": "malgaski",
            "mh": "marszalski",
            "mhr": "maryjski wschodni",
            "mi": "maoryski",
            "min": "minangkabau",
            "mk": "macedoński",
            "ml": "malajalam",
            "mn": "mongolski",
            "mo": "mołdawski",
            "mr": "marathi",
            "mrj": "maryjski zachodni",
            "ms": "malajski",
            "mt": "maltański",
            "mus": "krik",
            "mwl": "mirandyjski",
            "my": "birmański",
            "myv": "erzja",
            "mzn": "mazanderański",
            "na": "nauruański",
            "nah": "nahuatl",
            "nap": "neapolitański",
            "nds": "dolnoniemiecki",
            "nds_nl": "dolnoniemiecki (Holandia)",
            "ne": "nepalski",
            "new": "newarski",
            "ng": "ndonga",
            "nl": "holenderski",
            "nn": "norweski (nynorsk)",
            "no": "norweski (bokmål)",
            "nov": "novial",
            "nrm": "normandzki",
            "nso": "północny sotho",
            "nv": "nawaho",
            "ny": "cziczewa",
            "oc": "prowansalski",
            "om": "oromo",
            "or": "orija",
            "os": "osetyjski",
            "pa": "pendżabski",
            "pag": "pangasinan",
            "pam": "pampango",
            "pap": "papiamento",
            "pcd": "pikardyjski",
            "pdc": "pensylwański",
            "pfl": "palatynacki",
            "pi": "pali",
            "pih": "norfolk",
            "pl": "polski",
            "pms": "piemoncki",
            "pnb": "zachodniopendżabski",
            "pnt": "pontyjski",
            "ps": "paszto",
            "pt": "portugalski",
            "qu": "keczua",
            "rm": "retoromański",
            "rmy": "romski",
            "rn": "rundi",
            "ro": "rumuński",
            "roa_rup": "arumuński",
            "roa_tara": "tarencki",
            "ru": "rosyjski",
            "rue": "rusiński",
            "rw": "ruanda",
            "sa": "sanskryt",
            "sah": "jakucki",
            "sc": "sardyński",
            "scn": "sycylijski",
            "sco": "szkocki",
            "sd": "sindhi",
            "se": "północnosaamski",
            "sg": "sango",
            "sh": "serbsko-chorwacki",
            "si": "syngaleski",
            "simple": "Simple English",
            "sk": "słowacki",
            "sl": "słoweński",
            "sm": "samoański",
            "sn": "shona",
            "so": "somalijski",
            "sq": "albański",
            "sr": "serbski",
            "srn": "sranan tongo",
            "ss": "suazi",
            "st": "sotho",
            "stq": "fryzyjski saterlandzki",
            "su": "sundajski",
            "sv": "szwedzki",
            "sw": "suahili",
            "szl": "śląski",
            "ta": "tamilski",
            "te": "telugu",
            "tet": "tetum",
            "tg": "tadżycki",
            "th": "tajski",
            "ti": "tigrinia",
            "tk": "turkmeński",
            "tl": "tagalski",
            "tn": "tswana",
            "to": "tonga",
            "tpi": "tok pisin",
            "tr": "turecki",
            "ts": "tsonga",
            "tt": "tatarski",
            "tum": "tumbuka",
            "tw": "twi",
            "ty": "tahitański",
            "tyv": "tuwiński",
            "udm": "udmurcki",
            "ug": "ujgurski",
            "uk": "ukraiński",
            "ur": "urdu",
            "uz": "uzbecki",
            "ve": "venda",
            "vec": "wenecki",
            "vep": "wepski",
            "vi": "wietnamski",
            "vls": "zachodnioflamandzki",
            "vo": "volapük",
            "wa": "waloński",
            "war": "warajski",
            "wo": "wolof",
            "wuu": "wu",
            "xal": "kałmucki",
            "xh": "xhosa",
            "xmf": "megrelski",
            "yi": "jidysz",
            "yo": "joruba",
            "za": "zhuang",
            "zea": "zelandzki",
            "zh": "chiński standardowy",
            "zh_classical": "chiński klasyczny",
            "zh_min_nan": "minnan",
            "zh_yue": "kantoński",
            "zu": "zulu"
        };
        /**
         * Zwraca polską nazwę języka dla podanego kodu
         * @param code Kod języka
         */
        function GetLanguageName(code) {
            if (langs[code] !== undefined)
                return langs[code];
            return code;
        }
        InterwikiLanglist.GetLanguageName = GetLanguageName;
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
                /** Czy panel został automatycznie sfokusowany */
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
             * Wypełnia listę języków
             * @param q_id Identyfikator w Wikidanych
             * @param response_awaiter Odpowiedź z Wikidanych
             * @param create_url Link do utworzenia artykułu
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
             * Wyświetla selektor języków "przypięty" do danego linku
             * @param anchor Ikonka "Wikidane", do której należy przypiąć panel
             * @param reason Dlaczego należy pokazać element
             * @param red_link Czerwony link, powiązany z panelem
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
             * Ukrywa selektor języków
             * @param reason Powód ukrycia
             */
            LangList.prototype.Hide = function (reason) {
                var e_2, _a;
                // Jeśli pokazano po kliknięciu, ignoruj wyjeżdżanie myszą
                if (reason == VisibilityChangeReason.MouseMove
                    && this.AutoFocused)
                    return;
                // Przywróć fokus do dokumentu
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
                this.Wrapper.style.top = top + 'px';
                this.Wrapper.style.left = left + 'px';
                // Jeśli ikonka "Wikidane" wyszła poza ekran, ukryj
                if (anchor_rect.bottom < 0 || anchor_rect.top > window.innerHeight)
                    this.Hide(VisibilityChangeReason.Scroll);
                if (anchor_rect.right < 0 || anchor_rect.left > window.innerWidth)
                    this.Hide(VisibilityChangeReason.Scroll);
            };
            /**
             * Sprawdza, czy element należy do panelu lub kotwicy
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
        /** Klasa zarządzająca zawartością listy języków */
        var LangListView = /** @class */ (function () {
            function LangListView(wrapper) {
                var _this = this;
                this.CreateArticleWrapper = document.createElement('div');
                this.CreateArticleWrapper.classList.add('create-wrapper');
                this.CreateArticleWrapper.textContent = 'Tego artykułu nie ma jeszcze w polskojęzycznej Wikipedii. Możesz go utworzyć.';
                wrapper.appendChild(this.CreateArticleWrapper);
                this.CreateButton = document.createElement('a');
                this.CreateButton.classList.add('mw-ui-button', 'mw-ui-progressive');
                this.CreateButton.textContent = 'Utwórz stronę';
                this.CreateArticleWrapper.appendChild(this.CreateButton);
                var header = document.createElement('header');
                header.textContent = 'Dostępne języki';
                wrapper.appendChild(header);
                this.LanguagesList = document.createElement('ul');
                wrapper.appendChild(this.LanguagesList);
                this.NoLinks = document.createElement('div');
                this.NoLinks.classList.add('notice');
                this.NoLinks.textContent = 'Ten artykuł nie istnieje jeszcze w żadnym języku';
                wrapper.appendChild(this.NoLinks);
                this.Loading = document.createElement('div');
                this.Loading.classList.add('notice');
                this.Loading.textContent = 'Wczytywanie...';
                wrapper.appendChild(this.Loading);
                this.LoadingError = document.createElement('div');
                this.LoadingError.classList.add('notice');
                this.LoadingError.textContent = 'Nie udało się wczytać listy języków';
                wrapper.appendChild(this.LoadingError);
                this.ListFooter = document.createElement('footer');
                this.ListFooter.textContent = 'Pobrano z ';
                wrapper.appendChild(this.ListFooter);
                this.WikidataLink = document.createElement('a');
                this.WikidataLink.textContent = 'elementu Wikidanych';
                this.WikidataLink.href = 'https://wikidata.org';
                this.WikidataLink.addEventListener('keydown', (function (e) {
                    // Po naciśnięciu klawisza Tab, przejdź do pierwszego linku
                    if (e.code == 'Tab' && !e.shiftKey) {
                        _this.FocusFirstLink();
                        e.preventDefault();
                    }
                }).bind(this));
                this.ListFooter.appendChild(this.WikidataLink);
                wrapper.addEventListener('keydown', (function (e) {
                    // Po naciśnięciu klawisza Shift+Tab, przejdź do ostatniego linku
                    if (e.code == 'Tab' && e.shiftKey) {
                        _this.MoveFocusToEndIfNeeded(e);
                    }
                }).bind(this));
                this.PrepareForNextDisplay();
            }
            /**
             * Ustawia link do powiązanego elementu Wikidanych
             * @param q_id Identyfikator elementu Wikidanych
             */
            LangListView.prototype.SetWikidataElement = function (q_id) {
                this.WikidataLink.href = "https://www.wikidata.org/wiki/Special:EntityData/" + q_id;
                this.ListFooter.style.display = '';
            };
            /**
             * Ustawia adres docelowy przycisku "Utwórz stronę"
             * @param url Adres URL, prowadzący do strony tworzenia artykułu
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
             * Wypełnia listę linków do wersji językowych
             * @param sitelinks Tablica linków do innych wersji językowych
             * @param main_siteid Id projektu do oznaczenia jako główny
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
                        if (sitelink.IsMain) {
                            badge_title += ' (sugerowany przez autora)';
                            li.style.fontWeight = 'bold';
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
                // Dodaj link "pokaż wszystkie"
                if (hidden_li.length > 0) {
                    var li_1 = document.createElement('li');
                    var a = document.createElement('a');
                    a.href = 'javascript:void(0)';
                    a.innerText = 'pokaż więcej';
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
                        e.stopPropagation(); // Dzięki temu kliknięcie nie ukrywa panelu
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
                this.ListFooter.style.display = 'none';
                this.NoLinks.style.display = 'none';
                this.LoadingError.style.display = 'none';
                this.Loading.style.display = '';
            };
            /**
             * Wyświetla komunikat o błędzie wczytywania danych
             */
            LangListView.prototype.DisplayLoadingError = function () {
                this.Loading.style.display = 'none';
                this.LoadingError.style.display = '';
            };
            /** Ustawia fokus na pierwszy link na liście */
            LangListView.prototype.FocusFirstLink = function () {
                var e_5, _a, e_6, _b;
                // Jeśli przycisk "Utwórz stronę" jest widoczny, ustaw na niego fokus
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
             * Jeśli ostatnio sfokusowany był pierwszy link na liście, przenosi fokus na ostatni
             * @param e Zdarzenie naciśnięcia klawisza. Zostaje anulowane, by przeglądarka nie przenosiła fokusu
             */
            LangListView.prototype.MoveFocusToEndIfNeeded = function (e) {
                var _a, _b;
                // Jeśli przycisk "Utwórz stronę" jest widoczny, sprawdź czy ma fokus
                var create_style = window.getComputedStyle(this.CreateArticleWrapper);
                if (create_style.getPropertyValue('display') != 'none') {
                    // Jeśli "Utwórz stronę" jest aktywny, ustaw fokus na koniec
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
                    // Jeśli poprzednik <li> jest widoczny, nic nie rób
                    if (li.style.display != 'none')
                        return;
                    li = li.previousElementSibling;
                }
                this.WikidataLink.focus();
                e === null || e === void 0 ? void 0 : e.preventDefault();
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
             * Odfiltrowuje linki do innych projektów niż Wikipedia. Sortuje je
             * według odznaczeń oraz preferencji użytkownika, odczytanych z ULS
             * @param sitelinks Tablica linków do innych języków
             * @param main_siteid Id projektu do oznaczenia jako "główny"
             */
            LangListView.prototype.SortAndFilterLinks = function (sitelinks, main_siteid) {
                var e_7, _a;
                var _b, _c;
                //@ts-ignore - mw.uls nie istnieje w definicjach :(
                var recommended_langs = new Set((_c = (_b = mw === null || mw === void 0 ? void 0 : mw.uls) === null || _b === void 0 ? void 0 : _b.getFrequentLanguageList()) !== null && _c !== void 0 ? _c : []);
                // Upewnij się, że w rekomendowanych językach jest kilka ważniejszych Wikipedii
                recommended_langs.add('en').add('de').add('fr').add('ru').add('es');
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
                /* Posortuj alfabetycznie języki */
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
        /** Udostępnia interfejs do Wikidanych */
        var WikidataClient = /** @class */ (function () {
            function WikidataClient() {
            }
            /**
             * Zwraca listę linków do innych wersji językowych
             * @param article_id Identyfikator artykułu
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
             * Pobiera listę linków do innych wersji językowych z Wikidanych
             * @param article Identyfikator artykułu
             */
            WikidataClient.FetchSitelinks = function (article) {
                return new Promise(function (resolve, reject) {
                    // mw.ForeignApi nie istnieje u użytkowników niezalogowanych
                    // Dlatego żądanie trzeba zrealizować "ręcznie"
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
            /**
             * Przetwarza id artykułu na obiekt opisujący link
             * @param article Id artykułu
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
            /** Przechowuje wcześniej pobrane linki. Czyszczone przy przeładowaniu strony */
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
         * Wyszukuje hiperłącze do innego projektu Wikimedia wewnątrz elementu
         * @param iw_link_wrapper Wrapper linku interwiki
         */
        var extractInterwikiLink = function (iw_link_wrapper) {
            var e_8, _a, e_9, _b;
            var _c;
            if (!iw_link_wrapper.classList.contains('link-interwiki-wd')
                && iw_link_wrapper.parentElement instanceof HTMLAnchorElement) {
                // Jeżeli wrapper jest wewnątrz linku, wyciągnij go na zewnątrz
                var link = iw_link_wrapper.parentElement;
                (_c = link.parentElement) === null || _c === void 0 ? void 0 : _c.insertBefore(iw_link_wrapper, link);
                try {
                    // Przenieś dzieci wrappera do linku
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
         * Wyciąga identyfikator artykułu z linku
         * @param iw_link Hiperłącze interwiki
         */
        var extractArticleId = function (iw_link) {
            var title_prefix = '.org/wiki/';
            var title_prefix_pos = iw_link.href.indexOf(title_prefix);
            if (title_prefix_pos < 0)
                return null;
            var title_pos = title_prefix_pos + title_prefix.length;
            var title = iw_link.href.substr(title_pos);
            //(język).wikipedia.org/ poprzedzone opcjonalnie "m." i/lub "www."
            var match = /\/\/(?:www.)?(?:m.)?([^.]+)\.wikipedia\.org\//i.exec(iw_link.href);
            var lang = match === null || match === void 0 ? void 0 : match[1];
            if (lang !== undefined) {
                return new InterwikiLanglist.ArticleId(lang + 'wiki', title);
            }
            // Sprawdź, czy link prowadzi do Wikidanych
            if (iw_link.href.indexOf('wikidata.org') >= 0) {
                return new InterwikiLanglist.ArticleId(InterwikiLanglist.ArticleId.WIKIDATA, title);
            }
            return null;
        };
        $(function () {
            var e_10, _a;
            var _b;
            // Wyszukaj interwiki wstawione za pomocą {link-interwiki}
            var iw_link_wrappers = document.querySelectorAll('.link-interwiki');
            var langlist = new InterwikiLanglist.LangList();
            var _loop_1 = function (iw_link_wrapper) {
                if (!(iw_link_wrapper instanceof HTMLElement))
                    return "continue";
                // Znajdź link; jeśli nie istnieje, to pomiń iterację
                var interwiki_link = extractInterwikiLink(iw_link_wrapper);
                if (interwiki_link === null)
                    return "continue";
                var article_id = extractArticleId(interwiki_link);
                if (article_id === null)
                    return "continue";
                // Wyłącz link interwiki i zastąp go symbolem wyboru języka
                interwiki_link.href = 'javascript:void(0)';
                interwiki_link.title = 'Zobacz, w jakich językach ten artykuł istnieje';
                interwiki_link.innerHTML = '<img src="//upload.wikimedia.org/wikipedia/commons/4/45/Translate_link_color_crop.svg" alt="[w innych językach]" width="12" />';
                var red_link;
                if (iw_link_wrapper.previousElementSibling instanceof HTMLAnchorElement) {
                    red_link = iw_link_wrapper.previousElementSibling;
                }
                var is_minerva = document.body.classList.contains('skin-minerva');
                if (is_minerva && red_link !== undefined) {
                    // Utwórz nowy link, by usunąć procedury obsługi zdarzeń,
                    // m.in. odpowiadające za wyświetlenia okna proponującego stworzenie strony
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
                // Kliknięcie ikonkę pokazuje panel języków
                interwiki_link === null || interwiki_link === void 0 ? void 0 : interwiki_link.addEventListener('click', function (e) { return display_langlist(InterwikiLanglist.VisibilityChangeReason.KeyPress, e); });
                // Poza skórką Minerva, panel pokazuje się również po najechaniu na ikonkę
                // W Minervie z kolei, można kliknąć również na czerwony link
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
                // Służy do ukrywania selektora języków
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
                // Kliknięcie poza listą języków ukrywa ją
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
