#encoding: utf-8
@javascript

Feature: Calculating the Body Mass Index
  Scenario: calculate the bmi
  Given I am a new, authenticated user
  When I visit the "/computest" page
  Then I should see "Tu indice de masa corporal es: 28"
  Then I should see "Estas 11% sobre tu peso ideal"
  Then I should see "Con Sobrepeso"
  