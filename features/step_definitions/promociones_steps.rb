Then /^I should watch the youtube video "(.*?)"$/ do |code|
  wait_until(30) do
    page.should have_xpath("//iframe[@src='http://www.youtube.com/embed/#{code}']")
  end
end
