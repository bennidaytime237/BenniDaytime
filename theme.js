/* Three-way colour theme control: light, dark, or follow the device.
 *
 * The stored choice is applied by a tiny inline script in each page's
 * <head> so there's no flash before this file loads. This file builds the
 * toggle UI and keeps everything in sync afterwards.
 */
(function () {
    var STORAGE_KEY = 'theme';
    var DEFAULT_MODE = 'system';

    var THEME_COLOR = {
        light: '#f7f7f6',
        dark: '#15171a'
    };

    var MODES = [
        {
            id: 'light',
            label: 'Light',
            icon: '<circle cx="12" cy="12" r="4"/>' +
                '<path d="M12 2.5v2M12 19.5v2M4.6 4.6l1.4 1.4M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>'
        },
        {
            id: 'dark',
            label: 'Dark',
            icon: '<path d="M20 14.6A8.5 8.5 0 0 1 9.4 4a7.5 7.5 0 1 0 10.6 10.6z"/>'
        },
        {
            id: 'system',
            label: 'Match device',
            icon: '<rect x="3" y="4.5" width="18" height="12" rx="2"/><path d="M8.5 20h7M12 16.5V20"/>'
        }
    ];

    var root = document.documentElement;
    var darkQuery = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;

    function readMode() {
        try {
            var stored = localStorage.getItem(STORAGE_KEY);
            if (stored === 'light' || stored === 'dark' || stored === 'system') return stored;
        } catch (e) { /* private mode, or storage disabled */ }
        return DEFAULT_MODE;
    }

    function storeMode(mode) {
        try {
            localStorage.setItem(STORAGE_KEY, mode);
        } catch (e) { /* nothing to do — the choice just won't persist */ }
    }

    function resolve(mode) {
        if (mode === 'light' || mode === 'dark') return mode;
        return darkQuery && darkQuery.matches ? 'dark' : 'light';
    }

    function apply(mode) {
        if (mode === 'system') {
            root.removeAttribute('data-theme');
        } else {
            root.setAttribute('data-theme', mode);
        }

        var meta = document.querySelector('meta[name="theme-color"]');
        if (meta) meta.setAttribute('content', THEME_COLOR[resolve(mode)]);
    }

    function build(mount, mode) {
        var group = document.createElement('div');
        group.className = 'theme-toggle';
        group.setAttribute('role', 'radiogroup');
        group.setAttribute('aria-label', 'Colour theme');

        MODES.forEach(function (option) {
            var input = document.createElement('input');
            input.type = 'radio';
            input.name = 'theme';
            input.value = option.id;
            input.id = 'theme-' + option.id;
            input.checked = option.id === mode;

            var label = document.createElement('label');
            label.setAttribute('for', input.id);
            label.title = option.label;
            label.innerHTML =
                '<svg viewBox="0 0 24 24" aria-hidden="true">' + option.icon + '</svg>' +
                '<span class="sr-only">' + option.label + '</span>';

            input.addEventListener('change', function () {
                if (!input.checked) return;
                storeMode(option.id);
                apply(option.id);
            });

            group.appendChild(input);
            group.appendChild(label);
        });

        mount.appendChild(group);
    }

    var mode = readMode();
    apply(mode);

    var mount = document.querySelector('[data-theme-mount]');
    if (mount) build(mount, mode);

    /* Follow the device live, but only while set to "match device" */
    if (darkQuery) {
        var onChange = function () {
            if (readMode() === 'system') apply('system');
        };
        if (darkQuery.addEventListener) {
            darkQuery.addEventListener('change', onChange);
        } else if (darkQuery.addListener) {
            darkQuery.addListener(onChange);
        }
    }

    /* Keep two tabs, or the homepage and the portfolio, in agreement */
    window.addEventListener('storage', function (e) {
        if (e.key !== STORAGE_KEY) return;
        var next = readMode();
        apply(next);
        var input = document.getElementById('theme-' + next);
        if (input) input.checked = true;
    });
})();
