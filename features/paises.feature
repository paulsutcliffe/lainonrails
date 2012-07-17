@javascript

Feature: When a user access the website from a not listed country, the user must be able to select a country from a map
  Scenario Outline: Accessing from different countries
  Given I visit the "/" page
  When I follow "<pais>"
  Then I must be on "/<country>/home"

  Examples:
    | pais        | country |
    | Perú        | pe      |
    | Costa Rica  | cr      |
    | Bolivia     | bo      |
    | El Salvador | sv      |
    | Uruguay     | uy      |
    | Guatemala   | gt      |