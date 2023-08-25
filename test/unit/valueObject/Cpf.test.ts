import ValidationError from "@/domain/error/ValidationError";
import Cpf from "@/domain/valueObject/Cpf";

describe('Cpf', () => {
  test('deve criar uma instância válida de CPF', () => {
    const cpf = new Cpf('12345678909');
    expect(cpf.getValue()).toBe('123.456.789-09');
  });

  test('deve lançar um erro ao criar uma instância inválida de CPF', () => {
    expect(() => new Cpf('1234567890')).toThrowError(new ValidationError("Cpf"));
  });

  test('deve lançar um erro ao criar uma instância inválida de CPF', () => {
    expect(() => new Cpf('11111111111')).toThrowError(new ValidationError("Cpf"));
  });
  
  test('deve lançar um erro ao criar uma instância inválida de CPF', () => {
    expect(() => new Cpf('12345678901')).toThrowError(new ValidationError("Cpf"));
  });
  test('deve lançar um erro ao criar uma instância inválida de CPF', () => {
    expect(() => new Cpf('12345678900')).toThrowError(new ValidationError("Cpf"));
  });

  test('deve validar corretamente um CPF válido', () => {
    const cpf = new Cpf('12345678909');
    expect(cpf.validate(cpf.getValue())).toBeTruthy();
  });
});

