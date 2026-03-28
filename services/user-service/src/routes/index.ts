import { Router } from "express";
import { authenticate } from "@url-shortener/common";

import { LoginModule } from "../modules/user.module.js";
import { ShortUrlModule } from "../modules/short-url.module.ts";

const router: Router = Router({ caseSensitive: true, mergeParams: true, strict: true });

router.post('/login', LoginModule.login);
router.post('/signup', LoginModule.signup);
router.get('/short-urls', authenticate, ShortUrlModule.fetch);

export { router };
