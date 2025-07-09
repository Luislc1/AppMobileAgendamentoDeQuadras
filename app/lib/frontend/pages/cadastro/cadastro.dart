import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
import 'package:app/frontend/wigets/appBar.dart';
import 'package:app/frontend/utils/validador.dart';

class Cadastro extends StatefulWidget {
  const Cadastro({super.key});

  @override
  State<Cadastro> createState() => _CadastroState();
}

class _CadastroState extends State<Cadastro> {
  final nomeController = TextEditingController();
  final cpfController = TextEditingController();
  final emailController = TextEditingController();
  final senhaController = TextEditingController();

  Future<void> cadastrarUsuario() async {

    if (nomeController.text.isEmpty ||
        emailController.text.isEmpty ||
        senhaController.text.isEmpty ||
        cpfController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Por favor, preencha todos os campos.'), backgroundColor: Colors.redAccent,),
      );
      return;
    }

    if (!Validador.validarCPF(cpfController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('CPF inválido.'), backgroundColor: Colors.redAccent,),
      );
      return;
    }

    if (!Validador.validarEmail(emailController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('E-mail inválido.'), backgroundColor: Colors.redAccent,),
      );
      return;
    }

    if (!Validador.validarSenha(senhaController.text)) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('A senha deve ter pelo menos 8 caracteres.'), backgroundColor: Colors.redAccent,),
      );
      return;
    }

    final url = Uri.parse('http://10.0.2.2:3001/usuarios');

    final response = await http.post(
      url,
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'nome': nomeController.text,
        'email': emailController.text,
        'senha': senhaController.text,
        'cpf': cpfController.text,
      }),
    );

    if (response.statusCode == 201) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Usuário cadastrado com sucesso!'), backgroundColor: Colors.greenAccent,),
      );
      Navigator.pushNamed(context, '/login');
    }
  }
  
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: const AppBarWidget(title: 'RACHÃO', showBackButton: true),
      body: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              padding: EdgeInsets.all(16),
              child: Text(
                'Cadastro',
                style: TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
              ),
            ),
            Container(
              padding: EdgeInsets.all(16),
              child: Column(
                children: [
                  TextFormField(
                    controller: nomeController,
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.person),
                      prefixIconColor: Colors.black,
                      labelText: 'Nome',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: cpfController,
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.lock_person_rounded),
                      prefixIconColor: Colors.black,
                      labelText: 'CPF',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: emailController,
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.email),
                      prefixIconColor: Colors.black,
                      labelText: 'E-mail',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                  ),
                  SizedBox(height: 16),
                  TextFormField(
                    controller: senhaController,
                    decoration: InputDecoration(
                      prefixIcon: Icon(Icons.lock),
                      prefixIconColor: Colors.black,
                      labelText: 'Senha',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    obscureText: true,
                  ),
                  SizedBox(height: 250),
                  ElevatedButton(
                    onPressed: cadastrarUsuario,
                    style: ElevatedButton.styleFrom(
                      backgroundColor: const Color.fromARGB(255, 68, 163, 241),
                      minimumSize: Size(300, 50),
                      shape: RoundedRectangleBorder(
                        borderRadius: BorderRadius.circular(12),
                      ),
                    ),
                    child: Text(
                      'Finalizar cadastro',
                      style: TextStyle(fontSize: 16, color: Colors.black),
                    ),
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
