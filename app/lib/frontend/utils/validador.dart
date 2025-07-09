class Validador {
  static bool validarSenha(String senha) {
    if (senha.length < 8) {
      return false;
    }

    bool temLetraMaiuscula = false;
    bool temLetraMinuscula = false;
    bool temNumero = false;

    for (int i = 0; i < senha.length; i++) {
      String caractere = senha[i];
      if (caractere == caractere.toUpperCase()) {
        temLetraMaiuscula = true;
      } else if (caractere == caractere.toLowerCase()) {
        temLetraMinuscula = true;
      } else if (int.tryParse(caractere) != null) {
        temNumero = true;
      }
      if (temLetraMaiuscula && temLetraMinuscula && temNumero) {
        return true;
      }
    }
    return false;
  }

  static bool validarCPF(String cpf) {
    if (cpf.length != 11) {
      return false;
    }

    int soma = 0;
    for (int i = 0; i < 9; i++) {
      int digito = int.parse(cpf[i]);
      soma += digito * (10 - i);
    }
    int primeiroDigito = (soma * 10) % 11;
    if (primeiroDigito == 10) {
      primeiroDigito = 0;
    }
    if (primeiroDigito != int.parse(cpf[9])) {
      return false;
    }

    soma = 0;
    for (int i = 0; i < 10; i++) {
      int digito = int.parse(cpf[i]);
      soma += digito * (11 - i);
    }
    int segundoDigito = (soma * 10) % 11;
    if (segundoDigito == 10) {
      segundoDigito = 0;
    }
    if (segundoDigito!= int.parse(cpf[10])) {
      return false;
    }

    return true;
  }

  static bool validarEmail(String email) {
    RegExp regex = RegExp(r'^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$');
    return regex.hasMatch(email);
  }
}