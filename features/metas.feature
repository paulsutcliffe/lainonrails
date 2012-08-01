# econding: utf-8
@javascript

Feature: Creating metas
Scenario: Creating and checking up the metas
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/metas" page
  And I follow "Nuevos Metas"
  And I fill in "Frases clave" with "Bajar de peso"
  And I fill in "Descripción" with "Lain, lider mundial en adelgazamiento"
  And I press "Guardar"
  Then I should see "Bajar de peso"
  And I should see "Metas guardados correctamente."
  And I should see "Lain, lider mundial en adelgazamiento"
  When I visit the "/metas" page
  Then I should not see "Nuevos Metas"

Scenario: Editando the metas
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/metas" page
  And I follow "Nuevos Metas"
  And I fill in "Frases clave" with "Subir de peso"
  And I fill in "Descripción" with "Lain, lider mundial en adelgazamiento"
  And I press "Guardar"
  Then I should see "Subir de peso"
  And I should see "Metas guardados correctamente."
  And I should see "Lain, lider mundial en adelgazamiento"
  Then I follow "Editar"
  And I fill in "Frases clave" with "Bajar de peso"
  And I fill in "Descripción" with "Lain, lider mundial en adelgazamiento"
  And I press "Guardar"
  Then I should see "Bajar de peso"
  And I should see "Metas actualizados correctamente."
  And I should see "Lain, lider mundial en adelgazamiento"
  When I visit the "/metas" page
  Then I should not see "Nuevos Metas"