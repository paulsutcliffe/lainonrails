Given /^that I am on the home page$/ do
  visit '/'
end

When /^I visit the "(.*?)" page$/ do |page|
  visit page
end

Then /^I should see the image "(.*?)"$/ do |image|
  page.should have_xpath("//img[contains(@src, \"#{image}\")]")
end

When /^I (accept|dismiss) the "([^"]*)" alert$/ do |action, text|
  alert = page.driver.browser.switch_to.alert
  alert.text.should eq(text)
  alert.send(action)
end
