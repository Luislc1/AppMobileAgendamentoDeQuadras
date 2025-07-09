import 'dart:convert';
import 'package:http/http.dart' as http;

class ApiService {
  //static const String baseUrl = 'http://10.0.2.2:3001';
   static const String baseUrl = 'http://192.168.100.7:3001';

  
  static Future<http.Response> cadastrarUsuario({
    required String nome,
    required String cpf,
    required String email,
    required String senha,
  }) async {
    try {
      final response = await http.post(
        Uri.parse(baseUrl),
        headers: {'Content-Type': 'application/json'},
        body: jsonEncode({
          'nome': nome,
          'cpf': cpf,
          'email': email,
          'senha': senha,
        }),
      );
      return response;
    } catch (e) {
      throw Exception('Erro ao conectar com o servidor: $e');
    }
  }
}