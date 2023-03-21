//@ts-check
/**
 * A gadget that extends functionality of [[w:pl:Template:Link-interwiki].
 * It allows user to browse a list of language versions where
 * the linked article already exists.
 * 
 * @author [[w:pl:User:Msz2001]]
 * <nowiki>
 */
$(function () {
    //! Define the messages
    var MSG = {
        panelTitle: 'Dostępne języki',
        fetchedFrom: ['Pobrano z ', 'elementu Wikidanych', ''],     // The middle one will be linked to the corresponding Wikidata item
        createArticle: 'Utwórz stronę',
        articleDoesntExist: 'Tego artykułu nie ma jeszcze w polskojęzycznej Wikipedii. Możesz go utworzyć.',
        articleNoLanguages: 'Ten artykuł nie istnieje jeszcze w żadnym języku',
        loading: 'Wczytywanie...',
        languagesLoadingError: 'Nie udało się wczytać listy języków',
        suggestedByAuthor: '$1 (sugerowany przez autora)',
        showMore: 'pokaż więcej',
        hiddenCount: function (n) {
            if(n == 1) return ' (1 ukryty)';
            if(n % 10 >= 5 || n % 10 <= 1 || n % 100 >= 12 || n % 100 <= 14) return ' (' + n + ' ukrytych)';
            return ' (' + n + ' ukryte)';
        },

        iconTitle: 'Zobacz, w jakich językach ten artykuł istnieje',
        iconAlt: '[w innych językach]'
    };

    var BADGES = {
        // A special badge that represents no badges
        none: {
            tooltip: '$1',
            priority: 0
        },
        Q17437798: {
            tooltip: '$1 – Dobry Artykuł',
            className: 'badge-da',
            priority: 1
        },
        Q17506997: {
            tooltip: '$1 – Lista na Medal',
            className: 'badge-lnm',
            priority: 2
        },
        Q17437796: {
            tooltip: '$1 – Artykuł na Medal',
            className: 'badge-anm',
            priority: 3
        }
    };


    //! Define some other constants
    /** Some major Wikipedias that are never going to be hidden if there are many links */
    var RECOMMENDED_SITES = ['enwiki', 'dewiki', 'frwiki', 'ruwiki', 'eswiki', 'itwiki'];
    /** Wikidata's wiki id */
    var WIKIDATA_ID = 'wikidatawiki';
    /** Key of the languages list in the localStorage */
    var LANG_CACHE_KEY = 'InterwikiLanglist.languages';
    /**
     * How long to cache the languages list (in milliseconds)
     * 7 days * 24 hrs * 60 mins * 60 secs * 1000 ms = 604 800 000 ms
     */
    var CACHE_TIME = 604800000;

    /** Here sitelinks are going to be cached */
    var sitelinkCache = {};
    /** This will be populated with the [code] = autonym pairs */
    var languageNames = {};


    //! Define the languages view
    /**
     * Initializes a language list view
     * @returns {LangListView} An object that may be used to control the list
     */
    function createLanguagesView() {
        // Create main elements for the panel: the panel itself & backdrop for mobile
        var $backdrop = $('<div class="interwiki-langlist-backdrop">');
        var $panel = $('<div class="interwiki-langlist-wrapper">');
        $('body').append($panel, $backdrop);

        // Invitation to create article (mimick Minerva's default behavior)
        var $createArticleButton = $('<a class="mw-ui-button mw-ui-progressive">')
            .text(MSG.createArticle);
        var $createArticleWrapper = $('<div class="create-wrapper">')
            .text(MSG.articleDoesntExist)
            .append($createArticleButton);
        $panel.append($createArticleWrapper);

        if(mw.config.get('skin') !== 'minerva') {
            // The button "create article" is hidden unless on Minerva
            $createArticleWrapper.addClass('hidden');
        }

        // The main parts of the UI (for all skins)
        var $header = $('<header>').text(MSG.panelTitle);
        var $messageBox = $('<div class="notice">').text(MSG.loading);
        var $languagesList = $('<ul>');
        var $footer = $('<footer>').addClass('hidden');

        // Attach everything to the panel
        $panel.append(
            $createArticleWrapper, $header,
            $messageBox, $languagesList,
            $footer
        );

        // Build link to the data source in the footer
        var $wdLink = $('<a>').text(MSG.fetchedFrom[1]);
        $footer.text(MSG.fetchedFrom[0]).append($wdLink).append(MSG.fetchedFrom[2]);

        /** @type {LangListView} */
        var view = {
            $anchor: null,  // The language icon
            $panel: $panel,     // The panel wrapper
            $visibleLinksCache: null,   // jQuery object with visible links
            currentArticleId: null,     // The id of an article whose sitelinks are displayed
            isPopulated: false,         // Whether the links have already been displayed
            openedWithClick: false,     // Whether the panel was opened by clicking on the icon or hovering it with the mouse

            /**
             * Sets the Qid of the currently displayed article. It's used to display footer properly
             * @param {string | null} qId The Qid of the current article or null if not connected
             */
            setQId: function (qId) {
                if(!qId) return;
                $wdLink.attr('href', 'https://www.wikidata.org/wiki/Special:EntityData/' + qId);
                $footer.removeClass('hidden');
                view.updateLinksCache();
            },

            /**
             * Sets target URL for the "Create article" button
             * @param {string} url The URL leading to the article create page
             */
            setCreateArticleUrl: function (url) {
                $createArticleButton.attr('href', url);
            },

            /**
             * Displays the sitelinks
             * @param {MarkedSitelink[]} links An array of links to display
             */
            displayLinks: function (links) {
                // Don't add links twice
                if(view.isPopulated) return;
                view.isPopulated = true;

                if(links.length == 0) {
                    view.displayMessage(MSG.articleNoLanguages);
                    view.updateLinksCache(function () {
                        if(!view.openedWithClick) return;
                        view.$visibleLinksCache.first().trigger('focus');
                    });
                    return;
                }
                $messageBox.hide();

                var hidden_$li = [];
                links.forEach(function (link) {
                    var $li = $('<li>');
                    var $a = $('<a>');
                    $a.attr('href', buildLink(link.article));
                    $a.text(getLanguageName(link.article.site));

                    // Mark the best articles
                    var tooltip = link.article.title;
                    if(link.article.badges.length > 0) {
                        var badge = BADGES[link.article.badges[0]] || BADGES.none;
                        tooltip = mw.format(badge.tooltip, link.article.title);
                        if(badge.className) $li.addClass(badge.className);
                    }

                    // The author may have specified a link to a foreign Wikipedia and not to Wikidata
                    if(link.authorSuggested) {
                        $li.addClass('suggested');
                        tooltip = mw.format(MSG.suggestedByAuthor, tooltip);
                    }

                    $a.attr('title', tooltip);
                    $li.append($a);
                    $languagesList.append($li);

                    if(!link.recommended && !link.authorSuggested && links.length > 10) {
                        $li.addClass('hidden');
                        hidden_$li.push($li);
                    }
                });

                // Add a link to display all sitelinks
                if(hidden_$li.length > 0) {
                    var $show_more = $('<a>').text(MSG.showMore);
                    var $more_li = $('<li>').append($show_more)
                        .append(MSG.hiddenCount(hidden_$li.length));
                    $languagesList.append($more_li);

                    $show_more.on('click', function (e) {
                        hidden_$li.forEach(function ($li) { $li.removeClass('hidden'); });
                        $more_li.remove();
                        e.stopPropagation();
                        view.updateLinksCache();
                    });
                }

                // If the panel was shown after a click on the icon, focus the first link
                view.updateLinksCache(function () {
                    if(!view.openedWithClick) return;
                    view.$visibleLinksCache.first().trigger('focus');
                });
            },

            /**
             * Updates the cache of visible links in the panel.
             * @param {() => void} [callback] Optional function to be run after updating the cache
             */
            updateLinksCache: function (callback) {
                window.requestAnimationFrame(function () {
                    view.$visibleLinksCache = $panel.find(':not(.hidden) a');
                    if(callback) callback();
                });
            },

            /**
             * Displays a message in the panel
             * @param {string} message The message to display
             */
            displayMessage: function (message) {
                $messageBox.show();
                $messageBox.text(message);
                $languagesList.empty();
            },

            /**
             * Refreshes the view position to align it with the language icon
             */
            refreshPosition: function () {
                if(!view.$anchor || !view.$anchor[0]) return;

                var margin = 16; // Margin between the panel and window boundary
                var horz_offset = 16; // Horizontal offset relative to the language icon

                var anchor_rect = view.$anchor[0].getBoundingClientRect();
                var own_rect = $panel[0].getBoundingClientRect();

                // The panel is displayed below and to the right by default
                var top = anchor_rect.bottom;
                var left = anchor_rect.left - horz_offset;

                // If there is no space below, place the panel above the language icon
                if(top + own_rect.height > window.innerHeight - margin) {
                    top = Math.max(anchor_rect.top - own_rect.height, margin);
                }

                // If there is no space to the right, move the panel leftwards
                if(left + own_rect.width > window.innerWidth - margin) {
                    left = Math.max(anchor_rect.right - own_rect.width + horz_offset, margin);
                }

                // Apply the position
                $panel.css('top', top + 'px');
                $panel.css('left', left + 'px');

                // If the language icon went off-screen, hide the panel
                if(
                    anchor_rect.bottom < 0
                    || anchor_rect.top > window.innerHeight
                    || anchor_rect.right < 0
                    || anchor_rect.left > window.innerWidth
                ) {
                    view.hide();
                }
            },

            /**
             * Returns the rectangle describing the panel position and size.
             * Adds a margin of 16px to the each side.
             * @returns {DOMRect}
             */
            getBoundary: function () {
                if(!view.$anchor) {
                    return new DOMRect(0, 0, 0, 0);
                }
                var margin = 16;

                var anchorRect = view.$anchor[0].getBoundingClientRect();
                var selectorRect = view.$panel[0].getBoundingClientRect();

                var leftmost = Math.min(anchorRect.left, selectorRect.left) - margin;
                var rightmost = Math.max(anchorRect.right, selectorRect.right) + margin;
                var topmost = Math.min(anchorRect.top, selectorRect.top) - margin;
                var bottommost = Math.max(anchorRect.bottom, selectorRect.bottom) + margin;

                return new DOMRect(leftmost, topmost, rightmost - leftmost, bottommost - topmost);
            },

            /**
             * Checks whether the element belongs to the panel or its anchor.
             * @param {HTMLElement} element An element to check
             * @returns {boolean}
             */
            isInPanel: function (element) {
                if(view.$panel[0] === element || $.contains(view.$panel[0], element)) return true;
                if(view.$anchor[0] === element || $.contains(view.$anchor[0], element)) return true;
                return false;
            },

            /**
             * Hides the view
             */
            hide: function () {
                if(view.openedWithClick) {
                    view.$anchor.trigger('focus');
                }

                $panel.removeClass('shown');
                $footer.addClass('hidden');
                view.displayMessage(MSG.loading);
                view.$anchor = null;
                view.$visibleLinksCache = null;
                view.currentArticleId = null;
                view.isPopulated = false;
                view.openedWithClick = false;
            },

            /**
             * Displays the view and positions it accordingly
             * @param {JQuery<HTMLElement>} $anchor The language icon
             * @param {ArticleId} articleId The id of article whose sitelinks to show
             */
            show: function ($anchor, articleId) {
                if(view.$anchor == $anchor) return;

                view.$anchor = $anchor;
                view.currentArticleId = articleId;
                $panel.addClass('shown');
                view.refreshPosition();
            },

            /**
             * Returns whether the panel is visible
             * @returns {boolean}
             */
            isVisible: function () {
                return view.$anchor !== null;
            }
        };

        // Simplify the keyboard navigation inside the panel
        trapFocus(view);

        return view;
    }

    /**
     * Enables focus cycling inside the element.
     * @param {LangListView} view The view where the focus should be trapped
     */
    function trapFocus(view) {
        view.$panel.on('keydown', function (e) {
            if(!view.$visibleLinksCache) return;
            if(e.code != 'Tab') return;
            if(!e.shiftKey) {
                // Tab = move focus forward
                var $last_a = view.$visibleLinksCache.last();
                if($last_a[0] === e.target) {
                    view.$visibleLinksCache.first().trigger('focus');
                    e.preventDefault();
                }
            } else {
                // Shift + Tab = move focus backward
                var $first_a = view.$visibleLinksCache.first();
                if($first_a[0] === e.target) {
                    view.$visibleLinksCache.last().trigger('focus');
                    e.preventDefault();
                }
            }
        });
    }

    //! Interaction with the article contents
    /**
     * Normalizes the markup involving the language links.
     * Sometimes the nesting scheme is `span > a`, and sometimes `a > span`.
     * In order to simplify the rest of the code, this function converts all
     * occurrences of .link-interwiki to `span > a` scheme
     */
    function normalizeLanguageLinks() {
        var $langLinks = $('.link-interwiki');
        $langLinks.each(function () {
            var $link = $(this);
            var $parent = $link.parent();

            // Change iff the parent is <a>
            if($parent.prop('tagName') != 'A') return;

            // Flip the $parent-$link hierarchy
            $link.insertBefore($parent);
            $parent.append($link.contents());
            $link.append($parent);
        });
    }

    /**
     * Extracts the title and wiki id from the URL
     * @param {string} url Interwiki URL
     * @returns {ArticleId | null}
     */
    function extractArticleId(url) {
        // First, extract the article title (or Qid) from the URL
        var titlePrefix = '.org/wiki/';
        var titlePrefixPos = url.indexOf(titlePrefix);
        if(titlePrefixPos < 0) return null;

        var titlePos = titlePrefixPos + titlePrefix.length;
        var title = url.substring(titlePos);

        // No need to extract the language if site is Wikidata
        var site = WIKIDATA_ID;
        if(url.indexOf('wikidata.org') < 0) {
            // Extract the language and hence the wiki id from the link
            // (lang).wikipedia.org/ optionally preceded by "m." and/or "www."
            var match = /\/\/(?:www.)?(?:m.)?([^.]+)\.wikipedia\.org\//i.exec(url);

            // If the link is indeed to the Wikipedia, make appropriate site id
            // Else return null to indicate that this is not an inter-language link
            if(match && match[1]) {
                site = match[1] + 'wiki';
            } else {
                return null;
            }
        }

        // Capitalize the first letter of the title
        title = title.charAt(0).toUpperCase() + title.substring(1);

        return {
            site: site,
            title: title,
            badges: []
        };
    }

    /**
     * Attaches mouse hover and click handler to each link.
     * On mobile skin the handler is also attached to the red link.
     * Returns the number of affected links.
     * @param {LangListView} view The view to be shown when needed
     * @returns {number}
     */
    function addHandlersToLanguageLinks(view) {
        var $langLinks = $('.link-interwiki a');
        var linkCount = 0;  // count the links
        $langLinks.each(function () {
            var $link = $(this);
            var url = $link.attr('href');
            var articleId = extractArticleId(url);
            if(!articleId) return;

            // Change the interwiki link into a language icon
            $link.attr('href', 'javascript:void(0)');
            $link.attr('title', MSG.iconTitle);
            $link.html('<img src="https://upload.wikimedia.org/wikipedia/commons/4/45/Translate_link_color_crop.svg" alt="' + MSG.iconAlt + '" width="12" />');

            var $redLink = $link.parent().prev();

            // Common statements for all three events are here
            var display = function () {
                if(view.isVisible()) return false;

                view.show($link, articleId);
                view.setCreateArticleUrl($redLink.attr('href'));
                loadLanguageLinksIntoView(articleId, view);
                return true;
            };

            // Handle the click event to enable touch interaction and invocation with keyboard
            $link.on('click', function () {
                if(!display()) return;
                view.openedWithClick = true;
            });
            linkCount++;

            // If the skin is not Minerva, listen for the mouse enter too
            var skin = mw.config.get('skin');
            if(skin !== 'minerva') {
                $link.on('mouseenter', function () {
                    display();
                });
            } else {
                // On Minerva, attach the click handler to the red link
                // so that the panel is easier to invoke
                $redLink.on('click', function (e) {
                    if(!display()) return;

                    // Don't navigate to the non-existent page
                    e.preventDefault();
                    e.stopPropagation();
                });
            }
        });
        return linkCount;
    }

    /**
     * Attaches handlers responsible for hiding the languages list
     * @param {LangListView} view The view to be hidden
     */
    function addPanelHideHandlers(view) {
        // Hide if the cursor is outside the panel
        document.addEventListener('mousemove', function (e) {
            if(!view.isVisible()) return;
            if(view.openedWithClick) return;

            var selector_rect = view.getBoundary();

            var is_out_X = e.clientX < selector_rect.left || e.clientX > selector_rect.right;
            var is_out_Y = e.clientY < selector_rect.top || e.clientY > selector_rect.bottom;

            if(is_out_X || is_out_Y) view.hide();
        });

        // Escape key also hides the panel
        document.addEventListener('keydown', function (e) {
            if(!view.isVisible() || !view.openedWithClick) return;
            if(e.code != 'Escape') return;
            view.hide();
            e.preventDefault();
            e.stopPropagation();
        });

        // Move the panel if it's too close to screen edges
        var scrolling = false;
        window.addEventListener('scroll', function () {
            // Reduce frequency of repositions
            if(!scrolling) {
                window.requestAnimationFrame(function () {
                    view.refreshPosition();
                    scrolling = false;
                });
            }

            scrolling = true;
        });

        // Clicking outside the panel hides it
        window.addEventListener('click', function (e) {
            if(!view.isVisible()) return;
            if(!(e.target instanceof HTMLElement)) return;

            if(view.isInPanel(e.target)) return;
            view.hide();
        });

        // Window resize will probably cause content reflow
        window.addEventListener('resize', view.refreshPosition);
    }

    /**
     * Listens for a mobile "This article not exists" drawer
     * and hides it immediately after it appears if the
     * language links are shown.
     * @param {LangListView} view The language list view
     */
    function addMobileDrawerObserver(view){
        /** @type {MutationCallback} */
        var callback = function(mutationList, observer) {
            mutationList.forEach(function(mutation) {
                // Don't interfere with drawers for other purposes
                if (!view.isVisible()) return;
                if (mutation.type !== 'childList') return;

                mutation.addedNodes.forEach(function(node){
                    //@ts-ignore
                    if(node.classList && node.classList.contains('drawer-container')) {
                        // Remove the drawer as it is not needed
                        node.remove();
                    }
                });
            });
        };

        // Observe for body children changes
        // We're interested only in direct children being added to body
        const observer = new MutationObserver(callback);
        observer.observe(document.body, { childList: true });
    }

    //! Wikidata client
    /**
     * Loads sitelinks for the given article
     * @param {ArticleId} articleId The article for which to load sitelinks
     * @param {LangListView} view The view where to put the links
     */
    function loadLanguageLinksIntoView(articleId, view) {
        fetchSitelinks(articleId).then(function (data) {
            // Check if the panel is still on the desired icon
            if(view.currentArticleId.site != articleId.site) return;
            if(view.currentArticleId.title != articleId.title) return;

            view.setQId(data.qId);
            sortSitelinks(data.sitelinks);
            var filteredLinks = filterSitelinks(data.sitelinks, articleId.site);
            view.displayLinks(filteredLinks);
        }).fail(function (e) {
            console.error('[InterwikiLanglist] Error fetching foreign articles', e);
            view.displayMessage(MSG.languagesLoadingError);
        });
    }

    /**
     * Downloads the sitelinks for a given article
     * @param {ArticleId} articleId The article
     * @returns {JQuery.Promise<{qId: string, sitelinks: ArticleId[]}>}
     */
    function fetchSitelinks(articleId) {
        /** @type {JQuery.Deferred<{qId: string, sitelinks: ArticleId[]}>} */
        var deferred = $.Deferred();

        // Escape some more characters (they are unsafe for URLs)
        var title = articleId.title.replace(/&/g, '%26');
        title = title.replace(/=/g, '%3D');

        // Prepare a selector depending on the wiki
        // For Wikidata it's sufficient to query the ids parameter
        // For any other wiki we need to supply the (sites, titles) pair
        var selector = 'ids=' + title;
        if(articleId.site != WIKIDATA_ID) {
            selector = 'sites=' + articleId.site + '&titles=' + title;
        }

        if(sitelinkCache[selector]) {
            deferred.resolve(sitelinkCache[selector]);
            return deferred.promise();
        }

        // mw.ForeignApi is not available for anons
        // Therefore, the request is done 'manually'
        $.ajax('https://www.wikidata.org/w/api.php?action=wbgetentities&format=json&' + selector + '&origin=https%3A%2F%2F' + window.location.hostname + '&props=sitelinks')
            .done(function (data) {
                try {
                    // Extract the first entity from the response
                    var entity = Object.entries(data.entities)[0];

                    // The entity's key is the Qid or -1 if the article is not connected to Wikidata
                    var qId = entity[0];
                    if(!qId.startsWith('Q')) qId = null;

                    /** @type {ArticleId[]} */
                    var sitelinks = Object.values(entity[1].sitelinks || {}) || [];
                    if(sitelinks.length == 0 && articleId.site != WIKIDATA_ID) {
                        // The article is not connected to Wikidata,
                        // so use the original article id as a link
                        articleId.title = articleId.title.replace(/_/g, ' ');
                        sitelinks = [articleId];
                    }

                    // Filter out wikis other than Wikipedia
                    sitelinks = sitelinks.filter(function (sitelink) {
                        if(!sitelink.site.endsWith('wiki')) return false;
                        var otherWikis = [
                            'mediawikiwiki', 'metawiki', 'commonswiki', 'sourceswiki',
                            'specieswiki', 'wikidatawiki', 'wikimaniawiki'
                        ];
                        return !otherWikis.includes(sitelink.site);
                    });

                    // Include Qid in order to make a link to the item in the panel footer
                    var result = {
                        qId: qId,
                        sitelinks: sitelinks
                    };
                    // Cache the result and resolve
                    sitelinkCache[selector] = result;
                    deferred.resolve(result);
                } catch(e) {
                    deferred.reject(e);
                }
            }).fail(function (data) {
                deferred.reject(data);
            });

        return deferred.promise();
    }

    /**
     * Builds an URL to the given article on other Wikipedia
     * @param {ArticleId} articleId The article
     */
    function buildLink(articleId) {
        var langCode = articleId.site.replace('wiki', '');
        var title = encodeURI(articleId.title.replace(/ /g, '_'));
        return 'https://' + langCode + '.wikipedia.org/wiki/' + title;
    }


    //! The languages manager
    /**
     * Fetches the language names from the API or from the localStorage
     */
    function loadLanguageNames() {
        // Cache recognizes the current UI language
        var userLang = mw.config.get('wgUserLanguage');
        var cached = mw.storage.getObject(LANG_CACHE_KEY);
        var now = Date.now();
        if(cached && now - cached.fetchDate <= CACHE_TIME && cached.userLang == userLang) {
            languageNames = cached.data;
            return;
        }

        $.ajax('/w/api.php?action=query&format=json&meta=languageinfo&formatversion=2&liprop=name&uselang=' + userLang)
            .done(function (data) {
                try {
                    var lang_info = Object.entries(data.query.languageinfo);
                    var languages = {};

                    // Normalize the codes to use underscores instead of hyphens
                    // Wikidata uses eg. be_x_old whereas API returns be-x-old
                    lang_info.forEach(function (row) {
                        languages[row[0].replace(/-/g, '_')] = row[1].name;
                    });

                    mw.storage.setObject(LANG_CACHE_KEY, {
                        fetchDate: Date.now(),
                        userLang: userLang,
                        data: languages
                    });
                    languageNames = languages;
                } catch(e) {
                    console.warn('[InterwikiLanglist] Error loading languages from the server', e);
                }
            });
    }

    /**
     * Returns the language's autonym based on its code or wiki id
     * @param {string} code The language's code
     * @returns {string}
     */
    function getLanguageName(code) {
        if(code.endsWith('wiki')) code = code.replace('wiki', '');
        if(languageNames[code] !== undefined) return languageNames[code];
        return code;
    }

    /**
     * Sorts the list of sitelinks by the language names
     * @param {ArticleId[]} sitelinks The sitelinks to sort
     */
    function sortSitelinks(sitelinks) {
        var sitelinkComparer = function (a, b) {
            // Compare the first badge of A and B (for simplicity; rarely there are more badges)
            var a_badge = BADGES[a.badges[0]] || BADGES.none;
            var b_badge = BADGES[b.badges[0]] || BADGES.none;

            // Most important badge first
            if(a_badge.priority != b_badge.priority)
                return b_badge.priority - a_badge.priority;

            // If badges are the same, compare alphabetically
            var a_name = getLanguageName(a.site).toLocaleLowerCase();
            var b_name = getLanguageName(b.site).toLocaleLowerCase();
            return a_name.localeCompare(b_name);
        };

        sitelinks.sort(sitelinkComparer);
    }

    /**
     * Marks some of the sitelinks as recommended
     * @param {ArticleId[]} sitelinks The list of sitelinks
     * @param {string} suggested_site The site id of a suggested link
     * @returns {MarkedSitelink[]}
     */
    function filterSitelinks(sitelinks, suggested_site) {
        /** @type {MarkedSitelink[]} */
        var marked_sitelinks = [];
        sitelinks.forEach(function (sitelink) {
            marked_sitelinks.push({
                recommended: RECOMMENDED_SITES.includes(sitelink.site),
                authorSuggested: sitelink.site === suggested_site,
                article: sitelink
            });
        });
        return marked_sitelinks;
    }

    /**
     * Retrieves a list of recommended languages from the ULS and appends them to the RECOMMENDED_SITES.
     * Furthermore, appends the UI language too
     */
    function addUlsToRecommendedLangs() {
        var addLanguage = function (lang) {
            lang += 'wiki';
            if(RECOMMENDED_SITES.includes(lang)) return;
            RECOMMENDED_SITES.push(lang);
        };

        //@ts-ignore
        var uls = mw.uls;
        // Add ULS recommended languages to the list specified at the top of gadget
        if(uls && uls.getFrequentLanguageList) {
            var uls_recommendations = uls.getFrequentLanguageList();
            uls_recommendations.forEach(addLanguage);
        }

        var userLang = mw.config.get('wgUserLanguage');
        addLanguage(userLang);
    }


    //! Initialize the gadget
    mw.loader.using('mediawiki.storage', loadLanguageNames);
    var view = createLanguagesView();
    normalizeLanguageLinks();
    addUlsToRecommendedLangs();
    if(addHandlersToLanguageLinks(view) > 0) {
        addPanelHideHandlers(view);

        // On Minerva there is a popup after clicking on a red link.
        // This gadget overrides it, so attach a new event listener
        if(mw.config.get('skin') === 'minerva') {
            addMobileDrawerObserver(view);
        }
    }
});
/**
 * To make use of type checking
 * @typedef {{
 *      $anchor: JQuery<HTMLElement> | null,
 *      $panel: JQuery<HTMLElement>,
 *      $visibleLinksCache: JQuery<HTMLElement> | null,
 *      currentArticleId: ArticleId | null,
 *      isPopulated: boolean,
 *      openedWithClick: boolean,
 *      setQId: (qId: string | null) => void,
 *      setCreateArticleUrl: (url: string) => void,
 *      displayLinks: (sitelinks: MarkedSitelink[]) => void,
 *      updateLinksCache: (callback?: () => void) => void,
 *      displayMessage: (message: string) => void,
 *      refreshPosition: () => void,
 *      getBoundary: () => DOMRect,
 *      isInPanel: (element: HTMLElement) => boolean,
 *      hide: () => void,
 *      show: ($anchor: JQuery<HTMLElement>, articleId: ArticleId) => void,
 *      isVisible: () => boolean
 * }} LangListView
 *
 * @typedef {{
 *      site: string,
 *      title: string,
 *      badges: string[]
 * }} ArticleId
 *
 * @typedef {{
 *      recommended: boolean,
 *      authorSuggested: boolean,
 *      article: ArticleId
 * }} MarkedSitelink
 */
// </nowiki>
