#encoding: utf-8
@javascript

Feature: Creating Ofertas to be displayed on the home page
  Scenario: creating ofertas
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/ofertas" page
  And I follow "Nueva oferta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta guardada correctamente."
  And I should see the image "picture.png"
  When I visit the "/ofertas" page
  Then I should not see "Nueva oferta"
  Given I am an admin not authenticated
  Given I am a new, authenticated user
  When I visit the "/pe/home" page
  Then I should see the image "picture.png"

  
  Scenario: editing ofertas
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/ofertas" page
  And I follow "Nueva oferta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta guardada correctamente."
  And I should see the image "picture.png"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta actualizada correctamente."
  And I should see the image "picture.png"
  Given I am an admin not authenticated
  Given I am a new, authenticated user
  When I visit the "/pe/home" page
  Then I should see the image "picture.png"

  
  
  Scenario: deleting ofertas
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/ofertas" page
  And I follow "Nueva oferta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Oferta guardada correctamente."
  And I should see the image "picture.png"
  Then I visit the "/ofertas" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Oferta eliminada correctamente."
