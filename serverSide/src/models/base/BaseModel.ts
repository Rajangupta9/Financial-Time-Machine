export abstract class BaseModel {
  id?: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data?: any) {
    this.createdAt = data?.createdAt || new Date();
    this.updatedAt = data?.updatedAt || new Date();

    if (data?.id) {
      this.id = data.id;
    }
  }

  abstract validate(): Promise<boolean>;

  toJSON(): Record<string, any> {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
