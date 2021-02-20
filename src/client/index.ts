import {router} from './configure';

declare global {
    interface Window { _: any; }
}

router.start();