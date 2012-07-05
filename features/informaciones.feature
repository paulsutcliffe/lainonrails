# encoding: utf-8
@javascript

Feature: add and modify general information for the layout
Scenario Outline: add general information
  Given that I am on the home page
  When I visit the "/<country>/informaciones" page
  And I follow "Ingresar Información"
  And I fill in "Teléfono" with "<telefono>"
  And I fill in "Número gratuito" with "<gratuito>"
  And I fill in "Email" with "<email>"
  And I fill in "Facebook" with "<facebook>"
  When I press "Guardar"
  Then I should see "<telefono>"
  And I should see "<gratuito>"
  And I should see "<email>"
  And I should see "<facebook>"
  And I should not see "Ingresar Información"

  Examples:
    | country | telefono | gratuito    | email                       | facebook                                                                                  |
    | bo      | 1234567  | 08002457567 | bolivia@lainadelgaza.net    |  https://www.facebook.com/pages/LAIN-L%C3%ADder-mundial-en-adelgazamiento/118838274816444 |
    | cr      | 5373688  | 08008768456 | costarica@lainadelgaza.net  |  https://www.facebook.com/pages/LAIN-L%C3%ADder-mundial-en-adelgazamiento/118838274816444 |
    | gt      | 8567366  | 08001876456 | guatemala@lainadelgaza.net  |  https://www.facebook.com/pages/LAIN-L%C3%ADder-mundial-en-adelgazamiento/118838274816444 |
    | pe      | 1268564  | 08008744736 | peru@lainadelgaza.net       |  https://www.facebook.com/pages/LAIN-L%C3%ADder-mundial-en-adelgazamiento/118838274816444 |
    | sv      | 8583567  | 08001356456 | elsalvador@lainadelgaza.net |  https://www.facebook.com/pages/LAIN-L%C3%ADder-mundial-en-adelgazamiento/118838274816444 |
    | uy      | 3567267  | 08001335656 | uruguay@lainadelgaza.net    |  https://www.facebook.com/pages/LAIN-L%C3%ADder-mundial-en-adelgazamiento/118838274816444 |