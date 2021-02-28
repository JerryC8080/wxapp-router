
Component({
    properties: {
        path: String,
        type: {
            type: String,
            value: 'gotoPage'
        },
        route: String,
        query: Object,
        delta: Number,
        setData: Object,
    },

    methods: {
        gotoPage(event) {
            const router = getApp().router;
            const { path, route, type, query} = this.data;
            const toPath = route || path;

            if (['gotoPage', 'navigateTo', 'switchTab', 'redirectTo'].includes(type)) {
                (router as any)[type](toPath, query);
            }

            if (type === 'navigateBack') {
                console.log({event});
                const { delta, setData } = this.data;
                router.navigateBack({ delta }, { setData })
            }

        }
    }

})