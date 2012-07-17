Then /^I must be on "(.*?)"$/ do |country|
  uri = URI.parse(current_url)
  "#{uri.path}".should == "#{country}"
end