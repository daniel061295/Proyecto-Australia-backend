import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';

import { createCategoryRouter } from './routes/categories.js';
import { createClientRouter } from './routes/clients.js';
import { createMeetingRouter } from './routes/meetings.js';
import { createMenuRouter } from './routes/menus.js';
import { createProfileRouter } from './routes/profiles.js';
import { createServiceRouter } from './routes/services.js';
import { createStateRouter } from './routes/states.js';
import { createSubmenuRouter } from './routes/submenus.js';
import { createUserRouter } from './routes/users.js';

import { CategoryModel } from './models/categories.js';
import { ClientModel } from './models/clients.js';
import { MeetingModel } from './models/meetings.js';
import { MenuModel } from './models/menus.js';
import { ProfileModel } from './models/profiles.js';
import { ServiceModel } from './models/services.js';
import { StateModel } from './models/states.js';
import { SubmenuModel } from './models/submenus.js';
import { UserModel } from './models/users.js';

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
