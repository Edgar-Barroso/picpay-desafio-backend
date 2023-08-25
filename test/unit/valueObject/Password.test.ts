import ValidationError from "@/domain/error/ValidationError";
import Password from "@/domain/valueObject/Password";
 
describe('Password', () => {
  test('deve criar uma instância válida de Password', () => {
    const cpf = new Password('senha123');
    expect(cpf.getValue()).toBe('senha123');
  });

  test('deve lançar um erro ao criar uma instância inválida de Password', () => {
    expect(() => new Password('senha invalid @-')).toThrowError(new ValidationError("Password"));
  });
})