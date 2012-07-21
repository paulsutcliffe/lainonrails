#encoding: utf-8
@javascript

Feature: Creating Banners to be displayed on the home page
  Scenario: creating banners
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/banners" page
  And I follow "Nuevo banner"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner guardado correctamente."
  And I should see the image "picture.png"
  When I visit the "/banners" page
  Then I should not see "Nuevo banner"
  Given I am an admin not authenticated
  Given that I am on the home page
  Then I should see the image "picture.png"
  

  
  Scenario: editing banners
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/banners" page
  And I follow "Nuevo banner"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner guardado correctamente."
  And I should see the image "picture.png"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner actualizado correctamente."
  And I should see the image "picture.png"
  Given that I am on the home page
  Then I should see the image "picture.png"
  
  
  Scenario: deleting banners
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/banners" page
  And I follow "Nuevo banner"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner guardado correctamente."
  And I should see the image "picture.png"
  Then I visit the "/banners" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Banner eliminado correctamente."
