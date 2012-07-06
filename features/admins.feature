#encoding: utf-8
@javascript

Feature: Admins

  Scenario Outline: creating a new admin account
  Given I am an admin not authenticated
  When I visit the "/admins/registro/inscribirse" page
  And I fill in "Email" with "<email>"
  And I fill in "Contraseña" with "<password>"
  And I fill in "Confirmar contraseña" with "<password>"
  And I press "Inscribirse"
  Then I should see "¡Bienvenido! Ha ingresado al sistema exitosamente"

  Examples:
    | email              | password  |
    | paulyoyo@gmail.com | chimpance |
    | iam@milesdavis.com | donalee   |
    

  Scenario: Willing to edit my admin account
  Given I am a new, authenticated admin
  Then I should see "Ingreso exitoso"
