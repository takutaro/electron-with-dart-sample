@HtmlImport('electron_app.html')
library electron_app;

import 'dart:html';
import 'dart:js' as js;
import 'package:web_components/web_components.dart' show HtmlImport;
import 'package:polymer/polymer.dart';

@PolymerRegister('electron-app')
class ElectronApp extends PolymerElement {
  ElectronApp.created() : super.created();

  @property
  js.JsObject get process => js.context['process'];

  @property
  String inputvalue = '';

  @reflectable
  cleartext(Event e, var detail) {
    set('inputvalue', '');
  }
}
