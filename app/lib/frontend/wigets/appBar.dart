import 'package:flutter/material.dart';

class AppBarWidget extends StatelessWidget {
  final String title;
  final List<Widget> actions;

  const AppBarWidget({
    required this.title,
    this.actions = const [],
  }) ;

  @override
  Widget build(BuildContext context) {
    return AppBar(
      title: Text(title),
      actions: actions,
    );
  }
}
