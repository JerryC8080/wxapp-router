"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routesConfig = void 0;
var wxapp_router_1 = require("@jerryc/wxapp-router");
var router = new wxapp_router_1.Router();
exports.routesConfig = [
    { path: '/home', route: '/pages/home/index' },
    { path: '/pageA', route: '/pages/pageA/index' },
    { path: '/pageB', route: '/pages/pageB/index' },
    { path: '/pageC/:name', route: '/pages/pageC/index' },
];
router.batchRegister(exports.routesConfig);
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxxREFBOEM7QUFFOUMsSUFBTSxNQUFNLEdBQUcsSUFBSSxxQkFBTSxFQUFFLENBQUM7QUFFZixRQUFBLFlBQVksR0FBRztJQUN4QixFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLG1CQUFtQixFQUFFO0lBQzdDLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsb0JBQW9CLEVBQUU7SUFDL0MsRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxvQkFBb0IsRUFBRTtJQUMvQyxFQUFFLElBQUksRUFBRSxjQUFjLEVBQUUsS0FBSyxFQUFFLG9CQUFvQixFQUFFO0NBQ3hELENBQUE7QUFFRCxNQUFNLENBQUMsYUFBYSxDQUFDLG9CQUFZLENBQUMsQ0FBQztBQUVuQyxrQkFBZSxNQUFNLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBSb3V0ZXIgfSBmcm9tICdAamVycnljL3d4YXBwLXJvdXRlcic7XG5cbmNvbnN0IHJvdXRlciA9IG5ldyBSb3V0ZXIoKTtcblxuZXhwb3J0IGNvbnN0IHJvdXRlc0NvbmZpZyA9IFtcbiAgICB7IHBhdGg6ICcvaG9tZScsIHJvdXRlOiAnL3BhZ2VzL2hvbWUvaW5kZXgnIH0sXG4gICAgeyBwYXRoOiAnL3BhZ2VBJywgcm91dGU6ICcvcGFnZXMvcGFnZUEvaW5kZXgnIH0sXG4gICAgeyBwYXRoOiAnL3BhZ2VCJywgcm91dGU6ICcvcGFnZXMvcGFnZUIvaW5kZXgnIH0sXG4gICAgeyBwYXRoOiAnL3BhZ2VDLzpuYW1lJywgcm91dGU6ICcvcGFnZXMvcGFnZUMvaW5kZXgnIH0sXG5dXG5cbnJvdXRlci5iYXRjaFJlZ2lzdGVyKHJvdXRlc0NvbmZpZyk7XG5cbmV4cG9ydCBkZWZhdWx0IHJvdXRlcjtcbiJdfQ==