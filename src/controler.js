import router from './index';
import { accountDetails } from '../utils/server_access';

export function viewDetailsAccountAction (numberAccount){
   accountDetails(numberAccount).then(data=>{
    
   })
}