"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../routes/index");
var app = getApp();
Page({
    data: {
        routesConfig: index_1.routesConfig,
        pageAQuery: { name: 'jc' },
        pageBQuery: { name: 'david' }
    },
    goPageA: function () {
        app.routes.pages.pageA.go({ name: "jc" });
    },
    goPageB: function () {
        app.routes.pages.pageB.go({ name: "david" });
    },
    goPageC: function () {
        getApp().router.gotoPage('/pageC/katy', { age: 18 });
    }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUFrRDtBQUdsRCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQUUsQ0FBQTtBQUVwQixJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixZQUFZLHNCQUFBO1FBQ1osVUFBVSxFQUFFLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRTtRQUMxQixVQUFVLEVBQUUsRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFO0tBQzlCO0lBQ0QsT0FBTztRQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUMsSUFBSSxFQUFDLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBQ0QsT0FBTztRQUNMLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsRUFBQyxJQUFJLEVBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztJQUM1QyxDQUFDO0lBQ0QsT0FBTztRQUNMLE1BQU0sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUMsR0FBRyxFQUFFLEVBQUUsRUFBQyxDQUFDLENBQUM7SUFDckQsQ0FBQztDQUNGLENBQUMsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbIi8vIGluZGV4LnRzXG5pbXBvcnQgeyByb3V0ZXNDb25maWcgfSBmcm9tICcuLi8uLi9yb3V0ZXMvaW5kZXgnO1xuXG4vLyDojrflj5blupTnlKjlrp7kvotcbmNvbnN0IGFwcCA9IGdldEFwcCgpXG5cblBhZ2Uoe1xuICBkYXRhOiB7XG4gICAgcm91dGVzQ29uZmlnLFxuICAgIHBhZ2VBUXVlcnk6IHsgbmFtZTogJ2pjJyB9LFxuICAgIHBhZ2VCUXVlcnk6IHsgbmFtZTogJ2RhdmlkJyB9XG4gIH0sXG4gIGdvUGFnZUEoKSB7XG4gICAgYXBwLnJvdXRlcy5wYWdlcy5wYWdlQS5nbyh7bmFtZTpcImpjXCJ9KTtcbiAgfSxcbiAgZ29QYWdlQigpIHtcbiAgICBhcHAucm91dGVzLnBhZ2VzLnBhZ2VCLmdvKHtuYW1lOlwiZGF2aWRcIn0pO1xuICB9LFxuICBnb1BhZ2VDKCkge1xuICAgIGdldEFwcCgpLnJvdXRlci5nb3RvUGFnZSgnL3BhZ2VDL2thdHknLCB7YWdlOiAxOH0pO1xuICB9XG59KVxuIl19