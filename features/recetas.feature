#encoding: utf-8
@javascript

Feature: Creating Recetas to be displayed on the home page
  Scenario: creating recetas
  Given that I am on the home page
  When I visit the "/recetas" page
  And I follow "Nueva receta"
  And I fill in "Nombre" with "Pizza"
  And I fill in "Ingredientes" with "Queijo catupiri e calabresa"
  And I fill in "Preparación" with "Bater tudo e comer"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I press "Guardar"
  Then I should see "Receta guardada correctamente."
  And I should see the image "picture.jpg"
  And I should see "Queijo catupiri e calabresa"
  And I should see "Bater tudo e comer"
  Given that I am on the home page
  Given I am a new, authenticated user
  Then I should see the image "picture.jpg"
  And I should see "Pizza"
  And I should see "Queijo catupiri e calabresa"
  And I should see "Bater tudo e comer"

  
  Scenario: editing recetas
  Given that I am on the home page
  When I visit the "/recetas" page
  And I follow "Nueva receta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I fill in "Nombre" with "Pizza"
  And I fill in "Ingredientes" with "Queijo caputiri e bresacala"
  And I fill in "Preparación" with "Bater tudo e comer"
  And I press "Guardar"
  Then I should see "Receta guardada correctamente."
  And I should see the image "picture.jpg"
  And I should see "Pizza"
  And I should see "Queijo caputiri e bresacala"
  And I should see "Bater tudo e comer"
  Then I follow "Editar"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I fill in "Nombre" with "Pizza"
  And I fill in "Ingredientes" with "Queijo catupiri e calabresa"
  And I fill in "Preparación" with "Bater tudo e comer"
  And I press "Guardar"
  Then I should see "Receta actualizada correctamente."
  And I should see the image "picture.jpg"
  And I should see "Pizza"
  And I should see "Queijo catupiri e calabresa"
  And I should see "Bater tudo e comer"
  Given that I am on the home page
  Given I am a new, authenticated user
  Then I should see the image "picture.jpg"
  
  
  Scenario: deleting recetas
  Given that I am on the home page
  When I visit the "/recetas" page
  And I follow "Nueva receta"
  When I attach the file "features/support/picture.jpg" to "Imagen"
  And I fill in "Nombre" with "Pizza"
  And I fill in "Ingredientes" with "Queijo catupiri e calabresa"
  And I fill in "Preparación" with "Bater tudo e comer"
  And I press "Guardar"
  Then I should see "Receta guardada correctamente."
  And I should see the image "picture.jpg"
  And I should see "Pizza"
  And I should see "Queijo catupiri e calabresa"
  And I should see "Bater tudo e comer"
  Then I visit the "/recetas" page
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Receta eliminada correctamente."
