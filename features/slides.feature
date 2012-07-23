#encoding: utf-8
@javascript

Feature: Creating Slides to be displayed on the home page, each one for every country

  Scenario Outline: display the slide on the home page from the same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	When I visit the "/<country>/slides" page
	And I follow "Nuevo slide"
	When I attach the file "features/support/picture.jpg" to "Imagen"
	And I press "Guardar"
	Then I should see "Slide guardado correctamente."
	And I should see the image "picture.png"
   
    Given I am an admin not authenticated
    When I visit the "/<country>/home" page
    Then I should see the image "picture.png"
    When I visit the "/<other_country>/home" page
    Then I should not see the image "picture.png"

  Examples:
    | other_country | country |
	| cr            | pe      |
	| bo            | cr      |
	| sv            | bo      |
	| pe            | sv      |
	| gt            | uy      |
	| uy            | gt      |
