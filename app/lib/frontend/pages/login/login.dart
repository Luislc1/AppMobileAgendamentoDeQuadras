import 'package:flutter/material.dart';
import 'package:app/frontend/wigets/textFormFieldLogin.dart';
import 'package:app/frontend/routes/routes.dart';
import 'package:app/frontend/utils/validador.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class Login extends StatefulWidget {
  const Login({super.key});

  @override
  State<Login> createState() => _LoginState();
}

class _LoginState extends State<Login> {
  final emailController = TextEditingController();
  final senhaController = TextEditingController();

  Future<void> login() async {
    if (emailController.text.isEmpty || senhaController.text.isEmpty) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Preencha todos os campos.'), backgroundColor: Colors.redAccent,),
      );
      return;
    }
    final url = Uri.parse('http://10.0.2.2:3001/usuarios');
    final response = await http.post(
      url,  
      headers: {'Content-Type': 'application/json'},
      body: jsonEncode({
        'email': emailController.text,
        'senha': senhaController.text,
      }),
    );

    if (response.statusCode == 200) {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text('Login realizado com sucesso!'), backgroundColor: Colors.greenAccent,),
      );
    }
  }
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.white,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text(
              'RACHÃO',
              style: TextStyle(
                fontSize: 40,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            SizedBox(height: 20),
            Text(
              'Login',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: Colors.black,
              ),
            ),
            SizedBox(height: 20),
            Form(
              child: Column(
                children: [
                  Padding(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        CampoTexto(
                          label: 'Email',
                          hint: 'Digite seu e-mail',
                          icon: Icons.email,
                          controller: emailController,
                          keyboardType: TextInputType.emailAddress,
                        ),
                        SizedBox(height: 20),
                        CampoTexto(
                          label: 'Senha',
                          hint: 'Digite sua senha',
                          icon: Icons.lock,
                          controller: senhaController,
                          obscureText: true,
                        ),
                        TextButton(
                          onPressed: () {},
                          style: TextButton.styleFrom(
                            padding: EdgeInsets.zero,
                            minimumSize: Size(0, 0),
                            tapTargetSize: MaterialTapTargetSize.shrinkWrap,
                            alignment: Alignment.centerLeft,
                          ),
                          child: Text('Esqueceu a senha?', style: TextStyle(color: const Color.fromARGB(255, 255, 0, 0)),),
                        ),
                      ],
                    ),
                  ),
                ],
              ),
            ),
            SizedBox(height: 60),
            ElevatedButton(
              onPressed: () {},
              style: ElevatedButton.styleFrom(
                minimumSize: Size(250, 30),
                maximumSize: Size(300, 50),
                backgroundColor: const Color.fromARGB(255, 68, 163, 241),

                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(12),
                ),
              ),
              child: Text(
                'Entrar',
                style: TextStyle(fontSize: 16, color: Colors.black),
              ),
            ),
            SizedBox(height: 60),
            TextButton(onPressed: (
            ) {
              Navigator.pushNamed(context, AppRoutes.cadastro);
            }, child: Text('Ainda não possui uma conta? Cadastre-se', style: TextStyle(color: Colors.black),  )),
          ],
        ),
      ),
    );
  }
}
