class ContactMailer < ActionMailer::Base
  default :from => "from@example.com"
  
  def contact_confirmation(contact)
    @contacto = contact
    mail(:to => "#{contact.nombre} #{contact.apellido} <#{contact.email}>", :subject => "LAIN Adelgaza")
  end
  def contact_registration(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN")
  end  
  
end
