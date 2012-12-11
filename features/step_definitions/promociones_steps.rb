Then /^I should watch the youtube video$/ do
  wait_until(30) do
    page.should have_xpath("//iframe[@src='http://www.youtube.com/embed/1P3RUF35e0I']")
  end
end
