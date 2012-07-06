#encoding: utf-8
@javascript

Feature: Creating Slides to be displayed on the home page
  Scenario: creating slides
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/slides" page
  And I follow "Nuevo slide"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Slide guardado correctamente."
  And I should see the image "picture.jpg"
  When I follow "Atrás"
  And I follow "Nuevo slide"
  When I attach the file "features/support/picture2.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Slide guardado correctamente."
  And I should see the image "picture2.jpg"
  Given I am an admin not authenticated
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  And I should see the image "picture2.jpg"


  Scenario: editing slides
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/slides" page
  And I follow "Nuevo slide"
  When I attach the file "features/support/picture2.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Slide guardado correctamente."
  And I should see the image "picture2.jpg"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Slide actualizado correctamente."
  And I should see the image "picture.jpg"
  Given I am an admin not authenticated
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  
  
  Scenario: deleting slides
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/slides" page
  And I follow "Nuevo slide"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Slide guardado correctamente."
  And I should see the image "picture.jpg"
  Then I visit the "/slides" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Slide eliminado correctamente."
