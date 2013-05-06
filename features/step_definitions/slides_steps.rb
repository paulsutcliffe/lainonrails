Then /^The slide should have the link "(.*?)"$/ do |url|
  page.should have_link(:href => url)
end
