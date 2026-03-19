import { Router } from "express";

import LoginModule from "../modules/user.module.js";

const router: Router = Router({ caseSensitive: true, mergeParams: true, strict: true });
router.post('/login', LoginModule.login);

