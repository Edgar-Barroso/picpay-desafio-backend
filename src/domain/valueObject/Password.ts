import ValidationError from "../error/ValidationError";

export default class Password{

  private value: string;

  constructor(value: string) {
    this.value = this.validate(value)
  }

  validate(password: string): string{
    const regex = /^[a-zA-Z0-9]+$/;
    if (password.length < 6 || !regex.test(password)) {
      throw new ValidationError("Password");
    }
    return password;
  }

  static decode(passwordHash: string): string {
    return passwordHash
  }

  static code(password:string){
    return password
  }
  
  getValue() {
    return this.value;
  }
}
