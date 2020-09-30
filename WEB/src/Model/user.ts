import { base_entity } from './base_entity';

export class user extends base_entity {
  user_role_id: number;
  user_name: string;
  password: string;
  email: string;
  api_token: string;
}
