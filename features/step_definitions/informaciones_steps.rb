Then /^I should see the link "(.*?)"$/ do |link|
  page.should have_xpath("//a[contains(@href, \"#{link}\")]")
end