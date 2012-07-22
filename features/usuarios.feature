#encoding: utf-8
@javascript

Feature: Usuarios

  Scenario Outline: creating a new account
  Given I am not authenticated
  When I go to the "/pe/home" page
  When I follow "Crear Cuenta"
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Apellido" with "<apellido>"
  And I fill in "Telefono" with "<telefono>"
  And I fill in "Altura (Mt)" with "<altura>"
  And I fill in "Peso (Kg)" with "<peso>"
  And I fill in "E-mail" with "<email>"
  And I fill in "Contraseña" with "<password>"
  And I fill in "Confirmación de contraseña" with "<password>"
  And I press "Inscribirse"
  Then I should see "¡Bienvenido! Ha ingresado al sistema exitosamente"

  Examples:
    | nombre | apellido  | telefono  | altura | peso | email              | password  |
    | paul   | sutcliffe | 998355383 | 1.82   | 95   | paulyoyo@gmail.com | chimpance |
    | miles  | davis     | 123456789 | 1.75   | 85   | iam@milesdavis.com | donalee   |
    

  Scenario: Willing to edit my account
  Given I am a new, authenticated user
  Then I should see "Ingreso exitoso"
  