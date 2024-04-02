export class BaseAuthTreeDTO {
  id: number;
  uid: string;
  authTree: {
    authName: string;
    authId: string;
    authType: string;
  }[];
  create_time: string;
  update_time: string;
}