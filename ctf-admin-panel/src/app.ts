import express from 'express';
import AdminJS from 'adminjs';
import { buildAuthenticatedRouter } from '@adminjs/express';
import provider from './admin/auth-provider.js';
import initializeDb from './db/index.js';
import Category from './models/category.js';
import TestimonyModel from './models/testimonies.js';
import { User } from './models/users.model.js';
import Mentor from './models/mentor.js';
import Post from './models/post.js';
import Partner from './models/partners.js';
import Prayer from './models/prayers.js';

const port = process.env.PORT || 8000;

const start = async () => {
  const app = express();

  await initializeDb();

  const admin = new AdminJS({
    resources: [
      {
        resource: User,
        options: {
          properties: {
            password: { isVisible: { list: false, filter: false, show: false, edit: false } },  
          }
        }
      },
      Category,
      TestimonyModel,
      Mentor,
      Post,
      Partner,
      Prayer
    ],
    branding: {
      logo: false,
      companyName: "CTF",
      withMadeWithLove: false  
    },
  })

  if (process.env.NODE_ENV === 'production') {
    await admin.initialize();
  } else {
    admin.watch();
  }

  const router = buildAuthenticatedRouter(
    admin,
    {
      cookiePassword: process.env.COOKIE_SECRET,
      cookieName: 'adminjs',
      provider,
    },
    null,
    {
      secret: process.env.COOKIE_SECRET,
      saveUninitialized: true,
      resave: true,
    },
  );

  app.use(admin.options.rootPath, router);

  app.listen(port, () => {
    console.log(`AdminJS available at http://localhost:${port}${admin.options.rootPath}`);
  });
};

start();
