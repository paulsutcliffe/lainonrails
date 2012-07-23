Given /^I am not authenticated$/ do
  visit('/usuarios/salir')
end

Given /^I am a new, authenticated user$/ do
  nombre = 'miles'
  apellido = 'davis'
  email = 'iam@milesdavis.com'
  password = 'donalee'
  telefono = '123456789'
  altura = '1.75'
  peso = '85'
  Usuario.new(:nombre => nombre, :apellido => apellido, :telefono => telefono, :altura => altura, :peso => peso, :email => email, :password => password, :password_confirmation => password).save!

  visit '/pe/home'
  fill_in "Email", :with => email
  fill_in "Password", :with => password
  click_button "Ir"

end