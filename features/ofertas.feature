#encoding: utf-8
@javascript

Feature: Creating Ofertas to be displayed on the home page
  Scenario: creating ofertas
  Given that I am on the home page
  When I visit the "/ofertas" page
  And I follow "Nueva oferta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta guardada correctamente."
  And I should see the image "picture.jpg"
  Then I should not see "Nueva oferta"
  Given that I am on the home page
  Given I am a new, authenticated user
  Then I should see the image "picture.jpg"

  
  Scenario: editing ofertas
  Given that I am on the home page
  When I visit the "/ofertas" page
  And I follow "Nueva oferta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta guardada correctamente."
  And I should see the image "picture.jpg"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta actualizada correctamente."
  And I should see the image "picture.jpg"
  Given that I am on the home page
  Given I am a new, authenticated user
  Then I should see the image "picture.jpg"
  
  
  Scenario: deleting ofertas
  Given that I am on the home page
  When I visit the "/ofertas" page
  And I follow "Nueva oferta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta guardada correctamente."
  And I should see the image "picture.jpg"
  Then I visit the "/ofertas" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Oferta eliminada correctamente."
