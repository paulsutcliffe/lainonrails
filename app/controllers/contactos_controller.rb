class ContactosController < InheritedResources::Base
  
  def create
    @contacto = Contacto.new(params[:contacto])
    if @contacto.valid?
      case I18n.locale
      when :uy
        ContactMailer.contact_registration_uy(@contacto).deliver
      when :bo
        ContactMailer.contact_registration_bo(@contacto).deliver
      when :gt
        ContactMailer.contact_registration_gt(@contacto).deliver
      when :pe
        ContactMailer.contact_registration_pe(@contacto).deliver
      when :sv
        ContactMailer.contact_registration_sv(@contacto).deliver
      when :cr
        ContactMailer.contact_registration_cr(@contacto).deliver
      else
        ContactMailer.contact_registration(@contacto).deliver
      end
      ContactMailer.contact_confirmation(@contacto).deliver
      redirect_to(new_contacto_path, :notice => "Su mensaje fue enviado con éxito.")
    else
      redirect_to(new_contacto_path, :notice => "Por favor corriga los errores y vuélvalo a intentar.")
    end
  end
end
