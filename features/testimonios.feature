#encoding: utf-8
@javascript

Feature: Creating Testimonios
  Scenario Outline: creating antes y después testimonios
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/<country>/testimonios/?tipo=antesydespues" page
  And I follow "Nuevo testimonio"
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Descripción" with "<descripcion>"
  And I choose "testimonio_tipo_antesydespues"
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Guardar"
  Then I should see "Testimonio guardado correctamente."
  And I should see "<nombre>"
  And I should see "<descripcion>"
  And I should see the image "picture.jpg"
  
  When I visit the "/<country>/testimonios/?tipo=video" page
  And I follow "Nuevo testimonio"
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Descripción" with "<descripcion>"
  And I choose "testimonio_tipo_video"
  And I fill in "Video Link" with "<video>"
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Guardar"
  Then I should see "Testimonio guardado correctamente."
  And I should see "<nombre>"
  And I should see "<descripcion>"
  And I should see the image "picture.jpg"
 
  Given I am an admin not authenticated
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  And I should see "<nombre>"
  And I should see "<descripcion>"
  When I visit the "/<country>/testimonios?tipo=video" page
  Then I should see the image "picture.jpg"
  And I should see "<nombre>"
  And I should see "<descripcion>"
  When I visit the "/<country>/testimonios?tipo=video" page
  Then I should see the image "picture.jpg"
  And I should see "<nombre>"
  And I should see "<descripcion>"
  When I visit the "/testimonios?locale=xx" page
  And I should not see "<nombre>"
  And I should not see "<descripcion>"
  

  Examples:
    | country | nombre    | descripcion                        | video                                      |
    | bo      | coltrane  | Jhon bajó de peso en solo un mes   | http://www.youtube.com/watch?v=1P3RUF35e0I |
    | cr      | davis     | Miles bajó de peso en solo un mes  | http://www.youtube.com/watch?v=1P3RUF35e0I |
    | gt      | hanckock  | Harbie bajó de peso en solo un mes | http://www.youtube.com/watch?v=1P3RUF35e0I |
    | pe      | henderson | Joe bajó de peso en solo un mes    | http://www.youtube.com/watch?v=1P3RUF35e0I |
    | sv      | bennett   | Tonny bajó de peso en solo un mes  | http://www.youtube.com/watch?v=1P3RUF35e0I |
    | uy      | pastorius | Jaco bajó de peso en solo un mes   | http://www.youtube.com/watch?v=1P3RUF35e0I |