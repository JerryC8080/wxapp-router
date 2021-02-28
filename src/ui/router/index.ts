import navigator from '../../lib/navigator';

Component({
    properties: {
        path: String,
        type: String,
        route: String,
        query: Object,
    },

    methods: {
        gotoPage() {
            const { path, route, type, query } = this.data;
            const toPath = route || path;

            if (['navigateTo', 'switchTab', 'redirectTo', 'navigateBack'].includes(path)) {
                navigator[type](toPath, query)
            } else {
                navigator.gotoPage(toPath, query);
            }

        }
    }

})