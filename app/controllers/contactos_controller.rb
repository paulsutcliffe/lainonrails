class ContactosController < InheritedResources::Base
  
  def create
    @contacto = Contacto.new(params[:contacto])
    if @contacto.valid?
      ContactMailer.contact_confirmation(@contacto).deliver
      ContactMailer.contact_registration(@contacto).deliver
      redirect_to(new_contacto_path, :notice => "Su mensaje fue enviado con éxito.")
    else
      redirect_to(new_contacto_path, :notice => "Por favor corriga los errores y vuélvalo a intentar.")
    end
  end
end
