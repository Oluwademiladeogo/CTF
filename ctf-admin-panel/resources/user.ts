import argon2 from 'argon2';
import passwordsFeature from '@adminjs/passwords';

import User from './models/user.js';
import componentLoader from './component-loader.js';

const adminJsOptions = {
  resources: [
    {
      resource: User,
      options: {
        //...your regular options go here'
        properties: { password: { isVisible: false } },
      },
      features: [
        passwordsFeature({
          componentLoader,
          properties: {
            encryptedPassword: 'password',
            password: 'newPassword'
          }
          hash: argon2.hash,
      })
      ]
    },
  ],
  //...
}