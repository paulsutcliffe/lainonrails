#encoding: utf-8
class ContactMailer < ActionMailer::Base
  default :from => "info@lainadelgaza.net"

  def contact_confirmation(contact)
    @contacto = contact
    mail(:to => "#{contact.nombre} #{contact.apellido} <#{contact.email}>", :subject => "LAIN Adelgaza")
  end

  def contact_registration_uy(contact)
    @contacto = contact
    mail(:to => "lainuru@montevideo.com.uy", :subject => "Mensaje desde la web de LAIN Uruguay")
  end

  def contact_registration_bo(contact)
    @contacto = contact
    mail(:to => "lain1004scz@entelnet.bo", :subject => "Mensaje desde la web de LAIN Bolivia")
  end

  def contact_registration_cr(contact)
    @contacto = contact
    mail(:to => "contactoweb.cr@laininternacional.com", :subject => "Mensaje desde la web de LAIN Costa Rica")
  end

  def contact_registration_gt(contact)
    @contacto = contact
    mail(:to => "lessguatemala@terra.com.gt", :subject => "Mensaje desde la web de LAIN Guatemala")
  end

  def contact_registration_pe(contact)
    @contacto = contact
    mail(:to => "contacto@lainadelgaza.net", :subject => "Mensaje desde la web de LAIN Perú")
  end

  def contact_registration_sv(contact)
    @contacto = contact
    mail(:to => "lainelsalvador@amnetsal.com", :subject => "Mensaje desde la web de LAIN El Salvador")
  end

end
