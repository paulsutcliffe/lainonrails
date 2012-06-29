Given /^that I'm on the home page$/ do
  visit '/'
end

When /^I visit the "(.*?)" page$/ do |page|
  visit page
end

Then /^I should see "(.*?)"$/ do |result|
  page.should have_content(result)
end

Then /^I fill in "(.*?)" with "(.*?)"$/ do |field, value|
  fill_in field, :with => value
end

Then /^I attach the file "(.*?)" to "(.*?)"$/ do |path, file|
  attach_file(field, path)
end

Then /^I press "(.*?)"$/ do |button|
  click_button button
end

Then /^I should see the image "(.*?)"$/ do |foto|
  page.should have_xpath("//img[@src=\"/system/assets/blog/fotos/1/regular/#{foto}\"]")
end

When /^I click on "(.*?)"$/ do |link|
  click_link link
end
