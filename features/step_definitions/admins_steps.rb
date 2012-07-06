Given /^I am an admin not authenticated$/ do
  visit('/admins/salir')
end

Given /^I am a new, authenticated admin$/ do
  email = 'iam@milesdavis.com'
  password = 'donalee'
  Admin.new(:email => email, :password => password, :password_confirmation => password).save!

  visit '/admins/ingresar'
  fill_in "Email", :with => email
  fill_in "Contraseña", :with => password
  click_button "Ingresar"

end