#encoding: utf-8
@javascript

Feature: Admins with Blogger attribute can only manage blog posts

  Scenario: creating a new post from a blogger account
  Given I am an blogger admin
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

  Scenario: check if Blogger Admin can only update the blog
  Given I am an blogger admin
  When I visit the "/ads" page
  Then I should see "No estas autorizado para acceder a estar página"