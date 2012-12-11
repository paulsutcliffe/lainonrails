#encoding: utf-8
@javascript

Feature: Creating Promociones for every country

  Scenario Outline: display the promoción on the home page from the same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	  When I visit the "/<country>/promociones" page
	  And I follow "Nueva Promoción"
	  When I fill in "Nombre" with "<name>"
    And I fill in "Video Link" with "http://www.youtube.com/watch?v=<video>"
    And I attach the file "features/support/picture.jpg" to "Imagen"
    When I press "Guardar"
    Then I should see "Promoción guardada correctamente."
    And I should watch the youtube video "<video>"
    When I follow "Editar"
    And I fill in "Video Link" with ""
	  When I press "Guardar"
	  Then I should see "Promoción actualizada correctamente."
	  And I should see the image "picture.jpg"
    And I should see "<name>"

    Given I am an admin not authenticated
    When I visit the "/<country>/promociones" page
    Then I should see the image "picture.jpg"
    And I should not see "Nueva Promoción"
    When I visit the "/<other_country>/promociones" page
    Then I should not see the image "picture.jpg"

  Examples:
    | other_country | country | name            | video       |
	  | cr            | pe      | 28 de Julio     | 1P3RUF35e0I |
	  | bo            | cr      | Día de la madre | _P9JfqSKyxk |
	  | sv            | bo      | Fiestas patrias | i3eoWA56Y5M |
	  | pe            | sv      | Verano          | o-dqtfmIs2I |
	  | gt            | uy      | Invierno        | Qsxg2glv70M |
	  | uy            | gt      | Navidad         | oayOIThxdmw |
