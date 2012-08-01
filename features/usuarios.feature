#encoding: utf-8
@javascript

Feature: Usuarios

  Scenario: creating a new account
  Given I am not authenticated
  Given I am a new, authenticated user
  Then I should see "Ingreso exitoso"
  