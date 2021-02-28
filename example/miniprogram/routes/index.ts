import { Router } from '@jerryc/wxapp-router';

const router = new Router();

export const routesConfig = [
    { path: '/home', route: '/pages/home/index' },
    { path: '/pageA', route: '/pages/pageA/index' },
    { path: '/pageB', route: '/pages/pageB/index' },
    { path: '/pageC/:name', route: '/pages/pageC/index' },
]

router.batchRegister(routesConfig);

export default router;
