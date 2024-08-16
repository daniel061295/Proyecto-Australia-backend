import express, { json } from 'express';
import cookieParser from 'cookie-parser';
import { corsMiddleware } from './middlewares/cors.js';
import { verityToken } from './middlewares/auth.js';

import { createCategoryRouter, CategoryModel } from './api/categories/categories.index.js';
import { createClientRouter, ClientModel } from './api/clients/clients.index.js';
import { createMeetingRouter, MeetingModel } from './api/meetings/meetings.index.js';
import { createMenuRouter, MenuModel } from './api/menus/menus.index.js';
import { createProfileRouter, ProfileModel } from './api/profiles/profiles.index.js';
import { createServiceRouter, ServiceModel } from './api/services/services.index.js';
import { createStateRouter, StateModel } from './api/states/states.index.js';
import { createSubmenuRouter, SubmenuModel } from './api/submenus/submenus.index.js';
import { createUserRouter, UserModel } from './api/users/users.index.js';

const app = express();
app.disable('x-powered-by');
app.use(corsMiddleware());
app.use(json());
app.use(cookieParser());

app.use(verityToken);

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
