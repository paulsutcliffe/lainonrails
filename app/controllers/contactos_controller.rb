#encoding: utf-8
class ContactosController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :new, :create ]
  before_filter :find_pais, :except => [ :new ]
  load_and_authorize_resource :except => [ :new, :create ]
  def find_pais
    if params[:locale]
      @contactos = Contacto.where("pais = ?", params[:locale])
    end
  end
  
  def create
    @contacto = Contacto.new(params[:contacto])
    @contacto.pais = params[:locale]
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
      end
      ContactMailer.contact_confirmation(@contacto).deliver
      create!(:notice => "Su mensaje fue enviado con éxito.") { new_contacto_path }
    end
  end
end
