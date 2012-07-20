#encoding: utf-8
@javascript

Feature: Calculating the Body Mass Index
  Scenario Outline: calculate the bmi
  Given I am on the home page
  When I visit the "/computests/new" page
  And I fill in "Nombre" with "<nombre>"
  And I fill in "Apellido" with "<apellido>"
  And I fill in "Teléfono" with "<telefono>"
  And I select "<sexo>" from "Sexo"
  And I fill in "Altura" with "<altura>"
  And I fill in "Peso" with "<peso>"
  And I fill in "E-mail" with "<email>"
  And I press "Calcular"
  Then I should see "<imc>"
  And I should see "<peso_ideal>"
  And I should see "<estado>"
  And I should see "<nombre>"
  And I should see "<apellido>"
  And I should see "<email>"

  Examples:
    | nombre | apellido  | telefono  | email             | sexo         | altura | peso | imc | peso_ideal | estado        |
    | paul   | sutcliffe | 998355383 | paul@kosmyka.com  | Masculino    | 1.82   | 95   | 29  | 14%        | Con Sobrepeso |
    | miles  | davis     | 123456789 | im@milesdavis.com | Masculino    | 1.75   | 85   | 28  | 11%        | Peso ideal    |
  