import { Router } from 'express';

interface Controller {
    path: string;
    router: Router;
    seed(): void;
}

export default Controller;