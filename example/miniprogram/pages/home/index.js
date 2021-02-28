"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var index_1 = require("../../routes/index");
var app = getApp();
Page({
    data: {
        routesConfig: index_1.routesConfig,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDRDQUFrRDtBQUdsRCxJQUFNLEdBQUcsR0FBRyxNQUFNLEVBQWMsQ0FBQTtBQUVoQyxJQUFJLENBQUM7SUFDSCxJQUFJLEVBQUU7UUFDSixZQUFZLHNCQUFBO0tBQ2I7SUFDRCxPQUFPO1FBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBQyxJQUFJLEVBQUMsQ0FBQyxDQUFDO0lBQ3pDLENBQUM7SUFDRCxPQUFPO1FBQ0wsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxFQUFDLElBQUksRUFBQyxPQUFPLEVBQUMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFDRCxPQUFPO1FBQ0wsTUFBTSxFQUFFLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxhQUFhLEVBQUUsRUFBQyxHQUFHLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUNyRCxDQUFDO0NBQ0YsQ0FBQyxDQUFBIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaW5kZXgudHNcbmltcG9ydCB7IHJvdXRlc0NvbmZpZyB9IGZyb20gJy4uLy4uL3JvdXRlcy9pbmRleCc7XG5cbi8vIOiOt+WPluW6lOeUqOWunuS+i1xuY29uc3QgYXBwID0gZ2V0QXBwPElBcHBPcHRpb24+KClcblxuUGFnZSh7XG4gIGRhdGE6IHtcbiAgICByb3V0ZXNDb25maWcsXG4gIH0sXG4gIGdvUGFnZUEoKSB7XG4gICAgYXBwLnJvdXRlcy5wYWdlcy5wYWdlQS5nbyh7bmFtZTpcImpjXCJ9KTtcbiAgfSxcbiAgZ29QYWdlQigpIHtcbiAgICBhcHAucm91dGVzLnBhZ2VzLnBhZ2VCLmdvKHtuYW1lOlwiZGF2aWRcIn0pO1xuICB9LFxuICBnb1BhZ2VDKCkge1xuICAgIGdldEFwcCgpLnJvdXRlci5nb3RvUGFnZSgnL3BhZ2VDL2thdHknLCB7YWdlOiAxOH0pO1xuICB9XG59KVxuIl19