#encoding: utf-8
@javascript

Feature: Contactos

  Scenario Outline: creating a new contact
  Given I am not authenticated
  When I visit the "/<country>/contacto" page
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Apellido" with "<apellido>"
  And I fill in "Telefono" with "<telefono>"
  And I fill in "Email" with "<email>"
  And I fill in "Dirección" with "<direccion>"
  And I fill in "Distrito" with "<distrito>"
  And I fill in "Ciudad" with "<ciudad>"
  And I fill in "Provincia" with "<provincia>"
  And I fill in "Mensaje" with "<mensaje>"
  And I press "Envíar"
  Then I should see "Su mensaje fue enviado con éxito."
  Given I am a new, authenticated admin
  When I visit the "/<country>/contactos" page
  Then I should see "<nombre>"
  Then I should see "<apellido>"
  Then I should see "<telefono>"
  Then I should see "<email>"
  Then I should see "<direccion>"
  Then I should see "<distrito>"
  Then I should see "<ciudad>"
  Then I should see "<provincia>"
  Then I should see "<country>"
  Then I should see "<mensaje>"
  

  Examples:
    | country | nombre | apellido | telefono  | email             | direccion      | distrito  | ciudad      | provincia | mensaje         |
    | bo      | miles  | davis    | 123455679 | im@milesdavis.com | Jazz Drive 511 | Blue Note | New Orleans | Indiana   | I love the Jazz |
    | cr      | miles  | davis    | 123455679 | im@milesdavis.com | Jazz Drive 511 | Blue Note | New Orleans | Indiana   | I love the Jazz |
    | gt      | miles  | davis    | 123455679 | im@milesdavis.com | Jazz Drive 511 | Blue Note | New Orleans | Indiana   | I love the Jazz |
    | pe      | miles  | davis    | 123455679 | im@milesdavis.com | Jazz Drive 511 | Blue Note | New Orleans | Indiana   | I love the Jazz |
    | sv      | miles  | davis    | 123455679 | im@milesdavis.com | Jazz Drive 511 | Blue Note | New Orleans | Indiana   | I love the Jazz |
    | uy      | miles  | davis    | 123455679 | im@milesdavis.com | Jazz Drive 511 | Blue Note | New Orleans | Indiana   | I love the Jazz |
