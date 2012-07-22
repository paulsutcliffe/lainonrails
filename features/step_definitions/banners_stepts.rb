Then /^I should not see the image "(.*?)"$/ do |picture|
  page.should have_no_xpath("//img[contains(@src, \"#{picture}\")]")
end