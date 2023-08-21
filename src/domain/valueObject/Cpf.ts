import ValidationError from "../error/ValidationError";

export default class Cpf {
  private value: string;

  constructor(value: string) {
    this.value = this.validate(value)
  }

  validate(value: string): string {
    let cpf = value.replace(/\D/g, "");
    if (cpf.length !== 11) throw new ValidationError("Cpf");
    if (/^(\d)\1{10}$/.test(cpf)) throw new ValidationError("Cpf");
    let soma = 0;
    for (let i = 0; i < 9; i++) {
      soma += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let resto = 11 - (soma % 11);
    let digitoVerificador = resto > 9 ? 0 : resto;
    if (digitoVerificador !== parseInt(cpf.charAt(9))) {
      throw new ValidationError("Cpf");
    }
    soma = 0;
    for (let i = 0; i < 10; i++) {
      soma += parseInt(cpf.charAt(i)) * (11 - i);
    }
    resto = 11 - (soma % 11);
    digitoVerificador = resto > 9 ? 0 : resto;
    if (digitoVerificador !== parseInt(cpf.charAt(10))) {
      throw new ValidationError("Cpf");
    }
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    return cpf;
  }

  getValue() {
    return this.value;
  }
}
