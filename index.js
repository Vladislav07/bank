import {
  authorizationRequest,
  listOfUserAccounts,
  accountDetails,
} from './server_access.js';

console.log('start');

authorizationRequest().then((token) => {
  listOfUserAccounts(token).then((id) => {
    accountDetails(token, id);
  });
});
