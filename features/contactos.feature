#encoding: utf-8
@javascript

Feature: Contactos

  Scenario: creating a new contact
  When I visit the "/contacto" page
  And I fill in "Nombre" with "Miles"
  And I fill in "Apellido" with "Davis"
  And I fill in "Telefono" with "123456789"
  And I fill in "Email" with "im@milesdavis.com"
  And I fill in "Dirección" with "Jazz Drive 511"
  And I fill in "Distrito" with "Blue Note"
  And I fill in "Ciudad" with "Nueva Orleans"
  And I fill in "Provincia" with "Indiana"
  And I fill in "Mensaje" with "I love the jazz"
  And I press "Envíar"
  Then I should see "Su mensaje fue enviado con éxito."