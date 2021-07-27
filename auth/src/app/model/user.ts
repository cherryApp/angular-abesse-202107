export class User {
  id: number = 0;
  firstName?: string = '';
  lastName?: string = '';
  email?: string = '';
  address?: string = '';
  ipAddress?: string = '';
  token?: string = '';
  password?: string = '';
  role?: number = 0; // 0: visitor, 1: viewer, 2: editor, 3: admin
}
