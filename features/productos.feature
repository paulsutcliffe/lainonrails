#encoding: utf-8
@javascript

Feature: Creating Productos for every country

  Scenario Outline: creating productos for every same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	When I visit the "/<country>/productos" page
	And I follow "Nuevo Producto"
	When I fill in "Nombre" with "<name>"
	When I fill in "Descripción" with "<description>"
	When I fill in "Video 1" with "<video>"
	When I fill in "Video 2" with "<video>"
	When I fill in "Video 3" with "<video>"
	And I attach the file "features/support/picture.jpg" to "Imagen"
	When I press "Guardar"
	Then I should see "Producto guardado correctamente."
	And I should see the image "picture.png"
	And I should see "<name>"
	And I should see "<description>"
   
    Given I am an admin not authenticated
    When I visit the "/<country>/productos" page
    Then I should see the image "picture.png"
    When I visit the "/<other_country>/productos" page
    Then I should not see the image "picture.png"

  Examples:
    | other_country | country | name            | description                      | video                     |
	| cr            | pe      | 28 de Julio     | Desenvolva com novas tecnologias | http://vimeo.com/45408437 |
	| bo            | cr      | Día de la madre | Desenvolva com novas tecnologias | http://vimeo.com/45408437 |
	| sv            | bo      | Fiestas patrias | Desenvolva com novas tecnologias | http://vimeo.com/45408437 |
	| pe            | sv      | Verano          | Desenvolva com novas tecnologias | http://vimeo.com/45408437 |
	| gt            | uy      | Invierno        | Desenvolva com novas tecnologias | http://vimeo.com/45408437 |
	| uy            | gt      | Navidad         | Desenvolva com novas tecnologias | http://vimeo.com/45408437 |
