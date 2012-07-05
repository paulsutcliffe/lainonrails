class ContactMailer < ActionMailer::Base
  default :from => "from@example.com"
  
  def contact_confirmation(contact)
    @contacto = contact
    mail(:to => "#{contact.nombre} #{contact.apellido} <#{contact.email}>", :subject => "LAIN Adelgaza")
  end
  
  def contact_registration_uy(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN Uruguay")
  end
  
  def contact_registration_bo(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN Bolivia")
  end
  
  def contact_registration_cr(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN Costa Rica")
  end
  
  def contact_registration_gt(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN Guatemala")
  end
  
  def contact_registration_pe(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN Perú")
  end
  
  def contact_registration_sv(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN El Salvador")
  end
  
  def contact_registration_uy(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN Uruguay")
  end
  
  def contact_registration(contact)
    @contacto = contact
    mail(:to => "info@kosmyka.com", :subject => "Mensaje desde la web de LAIN")
  end
end
