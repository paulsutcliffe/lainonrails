#encoding: utf-8
@javascript

Feature: Creating Ads to be displayed on the home page
  Scenario: creating ads
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/ads" page
  And I follow "Nuevo anuncio"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Anuncio guardado correctamente."
  And I should see the image "picture.jpg"
  When I visit the "/ads" page
  Then I should not see "Nuevo anuncio"
  Given I am an admin not authenticated
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  
  
  Scenario: editing ads
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/ads" page
  And I follow "Nuevo anuncio"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Anuncio guardado correctamente."
  And I should see the image "picture.jpg"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Anuncio actualizado correctamente."
  And I should see the image "picture.jpg"
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  
  
  Scenario: deleting ads
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/ads" page
  And I follow "Nuevo anuncio"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Anuncio guardado correctamente."
  And I should see the image "picture.jpg"
  Then I visit the "/ads" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Anuncio eliminado correctamente."
