#encoding: utf-8
@javascript

Feature: Creating Recetas to be displayed on the home page, each one for every country

  Scenario Outline: display the receta on the home page from the same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	When I visit the "/<country>/recetas" page
	And I follow "Nueva receta"
	And I fill in "Nombre" with "Pizza"
    And I fill in "Ingredientes" with "Queijo catupiri e calabresa"
    And I fill in "Preparación" with "Bater tudo e comer"
	And I press "Guardar"
	Then I should see "Receta guardada correctamente."
	And I should see "Pizza"
	And I should see "Queijo catupiri e calabresa"
	And I should see "Bater tudo e comer"

    When I visit the "/<country>/home" page
    Then I should see "Pizza"
	And I should see "Queijo catupiri e calabresa"
	And I should see "Bater tudo e comer"
    When I visit the "/<other_country>/home" page
    Then I should not see "Pizza"

  Examples:
    | other_country | country |
	| cr            | sv      |
	| bo            | cr      |
	| sv            | bo      |
	| gt            | uy      |
	| uy            | gt      |

