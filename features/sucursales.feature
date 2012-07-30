#encoding: utf-8
@javascript

Feature: Sucursales

  Scenario Outline: creating a new sucursal
  Given I am a new, authenticated admin
  When I visit the "/<country>/sucursales" page
  And I follow "Agregar Nueva Sucursal"
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Dirección" with "<direccion>"
  And I fill in "Teléfonos" with "<telefonos>"
  And I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Sucursal guardada correctamente."
  And I should see "<nombre>"
  And I should see "<direccion>"
  And I should see "<telefonos>"
  And I should see the image "picture.jpg"
  Then I visit the "/<country>/sucursales" page
  And I should see "<nombre>"
  And I should see "<direccion>"
  And I should see "<telefonos>"
  And I should see the image "picture.jpg"
  Then I visit the "/sucursales?locale=xx" page
  And I should not see "<nombre>"
  And I should not see "<direccion>"
  And I should not see "<telefonos>"


  Examples:
    | country | nombre          | telefonos | direccion      |
    | bo      | coltrane mall   | 123455679 | Jazz Drive 511 |
    | cr      | davis mall      | 123455679 | Jazz Drive 511 |
    | gt      | hanckock mall   | 123455679 | Jazz Drive 511 |
    | pe      | henderson mall  | 123455679 | Jazz Drive 511 |
    | sv      | bennett mall    | 123455679 | Jazz Drive 511 |
    | uy      | pastorius mall  | 123455679 | Jazz Drive 511 |
