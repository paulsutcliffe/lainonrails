#encoding: utf-8
@javascript

Feature: Contactos

  Scenario Outline: creating a new contact
  When I visit the "/<country>/sucursales" page
  And I follow "Nueva sucursal"
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Dirección" with "<direccion>"
  And I fill in "Teléfonos" with "<telefonos>"
  And I press "Guardar"
  Then I should see "Sucursal guardada correctamente."
  And I should see "<nombre>"
  And I should see "<direccion>"
  And I should see "<telefonos>"

  Examples:
    | country | nombre          | telefonos | direccion      | distrito  |
    | bo      | coltrane mall   | 123455679 | Jazz Drive 511 | Blue Note |
    | cr      | davis mall      | 123455679 | Jazz Drive 511 | Blue Note |
    | gt      | hanckock mall   | 123455679 | Jazz Drive 511 | Blue Note |
    | pe      | henderson mall  | 123455679 | Jazz Drive 511 | Blue Note |
    | sv      | bennett mall    | 123455679 | Jazz Drive 511 | Blue Note |
    | uy      | pastorius mall  | 123455679 | Jazz Drive 511 | Blue Note |
