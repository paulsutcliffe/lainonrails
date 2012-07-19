#encoding: utf-8
@javascript

Feature: Entradas
  Scenario: creating posts on the blog
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/blog" page
  And I follow "Agregar Nuevo Artículo"
  And I fill in "Titulo" with "Infarto al corazón y obesidad"
  And I fill in "Contenido" with "El infarto de miocardio (al corazón) es la principal causa de muerte de hombres y mujeres en todo el mundo. Infarto agudo de miocardio es el riego sanguíneo insuficiente, con daño en los tejidos en una parte del corazón producido por una obstrucción en una de las arterias coronarias por ruptura de una placa de ateroma (grasa dura en las arterias). La isquemia o suministro deficiente de oxígeno que resulta de tal obstrucción produce la angina de pecho (dolor), la lesión del miocardio y finalmente el infarto."
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Publicar"
  Then I should see "Entrada publicada correctamente."
  And I should see "Infarto al corazón y obesidad"
  And I should see the image "picture.jpg"
  Given I am an admin not authenticated
  When I visit the "/blog" page
  Then I should see "Infarto al corazón y obesidad"
  #Given that I am on the home page
  #And I should see "Infarto al corazón y obesidad"
  #And I should see the image "picture.jpg"

  
  Scenario: editing posts on the blog
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/blog" page
  And I follow "Agregar Nuevo Artículo"
  And I fill in "Titulo" with "Injuarto al corazón y obesidad"
  And I fill in "Contenido" with "El infarto de miocardio (al corazón) es la principal causa de muerte de hombres y mujeres en todo el mundo. Infarto agudo de miocardio es el riego sanguíneo insuficiente, con daño en los tejidos en una parte del corazón producido por una obstrucción en una de las arterias coronarias por ruptura de una placa de ateroma (grasa dura en las arterias). La isquemia o suministro deficiente de oxígeno que resulta de tal obstrucción produce la angina de pecho (dolor), la lesión del miocardio y finalmente el infarto."
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Publicar"
  Then I should see "Entrada publicada correctamente."
  And I should see "Injuarto al corazón y obesidad"
  And I should see the image "picture.jpg"
  Then I follow "Editar"
  And I fill in "Titulo" with "Infarto al corazón y obesidad"
  And I press "Publicar"
  Then I should see "Entrada actualizada correctamente."
  And I should see "Infarto al corazón y obesidad"
  #Given that I am on the home page
  #And I should see "Infarto al corazón y obesidad"
  #And I should see the image "picture.jpg"
  
  
  Scenario: deleting posts on the blog
  Given I am a new, authenticated admin
  Given that I am on the home page
  When I visit the "/blog" page
  And I follow "Agregar Nuevo Artículo"
  And I fill in "Titulo" with "Infarto al corazón y obesidad"
  And I fill in "Contenido" with "El infarto de miocardio (al corazón) es la principal causa de muerte de hombres y mujeres en todo el mundo. Infarto agudo de miocardio es el riego sanguíneo insuficiente, con daño en los tejidos en una parte del corazón producido por una obstrucción en una de las arterias coronarias por ruptura de una placa de ateroma (grasa dura en las arterias). La isquemia o suministro deficiente de oxígeno que resulta de tal obstrucción produce la angina de pecho (dolor), la lesión del miocardio y finalmente el infarto."
  When I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Publicar"
  Then I should see "Entrada publicada correctamente."
  And I should see "Infarto al corazón y obesidad"
  And I should see the image "picture.jpg"
  When I follow "Volver"
  Then I should see "Infarto al corazón y obesidad"
  Then I follow "Eliminar"
  When I accept the "¿Estás seguro?" alert
  Then I should see "Entrada eliminada correctamente."
