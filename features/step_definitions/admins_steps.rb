# encoding: utf-8
Given /^I am an admin not authenticated$/ do
  visit('/admins/salir')
end

Given /^I am a new, authenticated admin$/ do
  email = 'iam@milesdavis.com'
  password = 'donalee'
  admin = Admin.new(:email => email, :password => password, :password_confirmation => password)
  role = Role.new(:name => "SuperAdmin")
  admin.roles << role
  admin.save!

  visit '/admins/ingresar'
  fill_in "E-mail", :with => email
  fill_in "Contraseña", :with => password
  click_button "Ingresar"

end
