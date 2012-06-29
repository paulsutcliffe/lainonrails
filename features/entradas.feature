#encoding: utf-8
@javascript

Feature: Entradas
  Scenario: Adicionando entradas no blog
  Given that I'm on the home page
  When I visit the "/blog" page
  And I click on "Nueva Entrada"
  And I fill in "Titulo" with "Infarto al corazón y obesidad"
  And I fill in "Contenido" with "El infarto de miocardio (al corazón) es la principal causa de muerte de hombres y mujeres en todo el mundo. Infarto agudo de miocardio es el riego sanguíneo insuficiente, con daño en los tejidos en una parte del corazón producido por una obstrucción en una de las arterias coronarias por ruptura de una placa de ateroma (grasa dura en las arterias). La isquemia o suministro deficiente de oxígeno que resulta de tal obstrucción produce la angina de pecho (dolor), la lesión del miocardio y finalmente el infarto."
  And I attach the file "features/support/picture.jpg" to "Foto"
  And I press "Publicar"
  Then I should see "Entrada publicada correctamente."
  And I should see "Infarto al corazón y obesidad"
  And I should see the image "picture.jpg"
  