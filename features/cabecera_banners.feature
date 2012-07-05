#encoding: utf-8
@javascript

Feature: Creating Cabecera Banners to be displayed on layout header
  Scenario: creating banners
  Given that I am on the home page
  When I visit the "/cabecera_banners" page
  And I follow "Nuevo banner"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner guardado correctamente."
  And I should see the image "picture.jpg"
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  When I visit the "/cabecera_banners" page
  Then I should not see "Nuevo banner"

  
  Scenario: editing banners
  Given that I am on the home page
  When I visit the "/cabecera_banners" page
  And I follow "Nuevo banner"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner guardado correctamente."
  And I should see the image "picture.jpg"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner actualizado correctamente."
  And I should see the image "picture.jpg"
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  
  
  Scenario: deleting banners
  Given that I am on the home page
  When I visit the "/cabecera_banners" page
  And I follow "Nuevo banner"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Banner guardado correctamente."
  And I should see the image "picture.jpg"
  Then I visit the "/cabecera_banners" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Banner eliminado correctamente."
