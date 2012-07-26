#encoding: utf-8
@javascript

Feature: Creating Cabecera Banners to be displayed on the home page, each one for every country

  Scenario Outline: display the banner on the homepage's header from the same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	When I visit the "/<country>/cabecera_banners" page
	And I follow "Nuevo Banner"
	When I attach the file "features/support/picture.jpg" to "Imagen"
	And I press "Guardar"
	Then I should see "Banner guardado correctamente."
	And I should see the image "picture.png"
	When I follow "Atrás"
	Then I should not see "Nuevo Banner"
	And I should see the image "picture.png"
	
	When I visit the "/<country>/promociones" page
	And I follow "Nueva Promoción"
	When I fill in "Nombre" with "<name>"
	And I attach the file "features/support/picture2.jpg" to "Imagen"
	When I press "Guardar"
	Then I should see "Promoción guardada correctamente."
	And I should see the image "picture2.jpg"
	And I should see "<name>"
   
    Given I am an admin not authenticated
    When I visit the "/<country>/home" page
    Then I should see the image "picture.png"
    And I should see the link "/<country>/promociones/<slug>"
    When I visit the "/<country>/promociones/<slug>" page
    Then I should see "<name>"
    And I should see the image "picture2.jpg"

    When I visit the "/<other_country>/home" page
    Then I should not see the image "picture.png"

	Examples:
	  | other_country | country | name            | slug            |
	  | cr            | pe      | 28 de Julio     | 28-de-julio     |
	  | bo            | cr      | Día de la madre | dia-de-la-madre |
	  | sv            | bo      | Fiestas patrias | fiestas-patrias |
	  | pe            | sv      | Verano          | verano          |
	  | gt            | uy      | Invierno        | invierno        |
	  | uy            | gt      | Navidad         | navidad         |