#encoding: utf-8
@javascript

Feature: Creating Promociones for every country

  Scenario Outline: display the promoción on the home page from the same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	When I visit the "/<country>/promociones" page
	And I follow "Nueva Promoción"
	When I fill in "Nombre" with "<name>"
	And I attach the file "features/support/picture.jpg" to "Imagen"
	When I press "Guardar"
	Then I should see "Promoción guardada correctamente."
	And I should see the image "picture.jpg"
	And I should see "<name>"
   
    Given I am an admin not authenticated
    When I visit the "/<country>/promociones" page
    Then I should see the image "picture.jpg"
    When I visit the "/<other_country>/promociones" page
    Then I should not see the image "picture.jpg"

  Examples:
    | other_country | country | name            |
	| cr            | pe      | 28 de Julio     |
	| bo            | cr      | Día de la madre |
	| sv            | bo      | Fiestas patrias |
	| pe            | sv      | Verano          |
	| gt            | uy      | Invierno        |
	| uy            | gt      | Navidad         |
