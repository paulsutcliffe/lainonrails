#encoding: utf-8
@javascript

Feature: Creating Testimonios
  Scenario: creating antes y después testimonios
  Given that I am on the home page
  When I visit the "/testimonios" page
  And I follow "Nuevo testimonio"
  And I fill in "Nombre" with "Miles Davis"
  And I fill in "Descripción" with "Miles bajó de peso en solo un mes."
  And I choose "testimonio_tipo_antesydespues"
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Guardar"
  Then I should see "Testimonio guardado correctamente."
  And I should see "Miles Davis"
  And I should see "Miles bajó de peso en solo un mes."
  And I should see the image "picture.jpg"
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  And I should see "Miles Davis"
  And I should see "Miles bajó de peso en solo un mes."
  When I visit the "/testimonios?tipo=antesydespues" page
  Then I should see the image "picture.jpg"
  And I should see "Miles Davis"
  And I should see "Miles bajó de peso en solo un mes."


  Scenario: creating video testimonios
  Given that I am on the home page
  When I visit the "/testimonios" page
  And I follow "Nuevo testimonio"
  And I fill in "Nombre" with "Miles Davis"
  And I fill in "Descripción" with "Miles bajó de peso en solo un mes."
  And I choose "testimonio_tipo_video"
  And I fill in "Video Link" with "http://www.youtube.com/watch?v=1P3RUF35e0I"
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Guardar"
  Then I should see "Testimonio guardado correctamente."
  And I should see "Miles Davis"
  And I should see "Miles bajó de peso en solo un mes."
  And I should see the image "picture.jpg"
  Given that I am on the home page
  Then I should see the image "picture.jpg"
  And I should see "Miles Davis"
  And I should see "Miles bajó de peso en solo un mes."
  When I visit the "/testimonios?tipo=video" page
  Then I should see the image "picture.jpg"
  And I should see "Miles Davis"
  And I should see "Miles bajó de peso en solo un mes."