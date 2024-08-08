import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';

import { createCategoryRouter } from './api/categories/categories.router.js';
import { createClientRouter } from './api/clients/clients.router.js';
import { createMeetingRouter } from './api/meetings/meetings.router.js';
import { createMenuRouter } from './api/menus/menus.router.js';
import { createProfileRouter } from './api/profiles/profiles.router.js';
import { createServiceRouter } from './api/services/services.router.js';
import { createStateRouter } from './api/states/states.router.js';
import { createSubmenuRouter } from './api/submenus/submenus.router.js';
import { createUserRouter } from './api/users/users.router.js';

import { CategoryModel } from './api/categories/categories.model.js';
import { ClientModel } from './api/clients/clients.model.js';
import { MeetingModel } from './api/meetings/meetings.model.js';
import { MenuModel } from './api/menus/menus.model.js';
import { ProfileModel } from './api/profiles/profiles.model.js';
import { ServiceModel } from './api/services/services.model.js';
import { StateModel } from './api/states/states.model.js';
import { SubmenuModel } from './api/submenus/submenus.model.js';
import { UserModel } from './api/users/users.model.js';

const app = express();
app.disable('x-powered-by');
app.use(corsMiddleware());
app.use(json());

app.use('/categories', createCategoryRouter({ categoryModel: CategoryModel }));
app.use('/clients', createClientRouter({ clientModel: ClientModel }));
app.use('/meetings', createMeetingRouter({ meetingModel: MeetingModel }));
app.use('/menus', createMenuRouter({ menuModel: MenuModel }));
app.use('/profiles', createProfileRouter({ profileModel: ProfileModel }));
app.use('/services', createServiceRouter({ serviceModel: ServiceModel }));
app.use('/states', createStateRouter({ stateModel: StateModel }));
app.use('/submenus', createSubmenuRouter({ submenuModel: SubmenuModel }));
app.use('/users', createUserRouter({ userModel: UserModel }));

const PORT = process.env.PORT ?? 8080;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
