#encoding: utf-8
@javascript

Feature: Admin create a new admin

  Scenario Outline: creating a new admin account
  Given I am a new, authenticated admin
  When I visit the "/admins" page
  And I follow "Agregar Administrador"
  And I fill in "E-mail" with "<email>"
  And I fill in "Contraseña" with "<password>"
  And I fill in "Confirmar contraseña" with "<password>"
  And I press "Registrar"
  Then I should see "<email>"

  Examples:
    | email              | password  |
    | paulyoyo@gmail.com | chimpance |
    | hola@kosmyka.com   | chimpance |


  Scenario: Willing to edit my admin account
  Given I am a new, authenticated admin
  Then I should see "Ingreso exitoso"
