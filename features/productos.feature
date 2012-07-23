#encoding: utf-8
@javascript

Feature: Creating productos
  Scenario: creating productos
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/productos" page
  And I follow "Nuevo Producto"
  And I fill in "Nombre" with "Sacián"
  And I fill in "Descripción" with "Sonríe en vez de comer."
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Producto guardado correctamente."
  And I should see "Sacián"
  And I should see "Sonríe en vez de comer."
  And I should see the image "picture.jpg"
  Given I am an admin not authenticated
  When I visit the "/productos" page
  Then I should see "Sacián"
  And I should see "Sonríe en vez de comer."
  And I should see the image "picture.png"

  
  Scenario: editing productos
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/productos" page
  And I follow "Nuevo Producto"
  And I fill in "Nombre" with "Juacián"
  And I fill in "Descripción" with "Come en vez de sonreir."
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Producto guardado correctamente."
  And I should see the image "picture.jpg"
  And I should see "Juacián"
  And I should see "Come en vez de sonreir."
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I fill in "Nombre" with "Sacián"
  And I fill in "Descripción" with "Sonríe en vez de comer."
  And I press "Guardar"
  Then I should see "Producto actualizado correctamente."
  And I should see the image "picture.jpg"
  And I should see "Sacián"
  And I should see "Sonríe en vez de comer."

  
  Scenario: deleting productos
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/productos" page
  And I follow "Nuevo Producto"
  And I fill in "Nombre" with "Sacián"
  And I fill in "Descripción" with "Sonríe en vez de comer."
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Producto guardado correctamente."
  And I should see the image "picture.jpg"
  And I should see "Sacián"
  And I should see "Sonríe en vez de comer."
  Then I visit the "/productos" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Producto eliminado correctamente."
