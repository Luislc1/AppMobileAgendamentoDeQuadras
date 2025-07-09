import 'package:flutter/material.dart';
import 'package:app/frontend/pages/login/login.dart';
import 'package:app/frontend/pages/cadastro/cadastro.dart';

class AppRoutes {
  static const String login = '/';
  static const String cadastro = '/cadastro';

  static Map<String, WidgetBuilder> routes = {
    login: (context) => const Login(),
    cadastro: (context) => const Cadastro(),
  };
}
