#encoding: utf-8
@javascript

Feature: Creating Banners to be displayed on the home page, each one for every country

  Scenario Outline: display the banner on the home page from the same country
    Given I am a new, authenticated admin
    Given that I am on the home page
	When I visit the "/<country>/banners" page
	And I follow "Nuevo banner"
	When I attach the file "features/support/picture.jpg" to "Imagen"
	And I press "Guardar"
	Then I should see "Banner guardado correctamente."
	And I should see the image "picture.png"
	When I follow "Atrás"
	Then I should not see "Nuevo banner"
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
    