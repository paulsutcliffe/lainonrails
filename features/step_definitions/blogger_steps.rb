# encoding: utf-8
Given /^I am an blogger admin$/ do
  email = 'iam@milesdavis.com'
  password = 'donalee'
  admin = Admin.new(:email => email, :password => password, :password_confirmation => password)
  role = Role.new(:name => "Blogger")
  admin.roles << role
  admin.save!

  visit '/admins/ingresar'
  fill_in "E-mail", :with => email
  fill_in "Contraseña", :with => password
  click_button "Ingresar"

end
