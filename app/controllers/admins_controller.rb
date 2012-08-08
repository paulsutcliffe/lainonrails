class AdminsController < ApplicationController
  before_filter :authenticate_admin!
  before_filter :get_admin, :only => [:index,:new,:edit]
  before_filter :accessible_roles, :only => [:new, :edit, :show, :update, :create]
  load_and_authorize_resource
  
  # Get roles accessible by the current admin
  #----------------------------------------------------
  def accessible_roles
    @accessible_roles = Role.accessible_by(current_ability,:read)
  end

  # Make the current admin object available to views
  #----------------------------------------
  def get_admin
    @current_admin = current_admin
  end
 
  # GET /admins
  # GET /admins.xml                                                
  # GET /admins.json                                       HTML and AJAX
  #-----------------------------------------------------------------------
  def index
    @admins = Admin.accessible_by(current_ability, :index).limit(20)
    respond_to do |format|
      format.json { render :json => @admins }
      format.xml  { render :xml => @admins }
      format.html
    end
  end
 
  # GET /admins/new
  # GET /admins/new.xml                                            
  # GET /admins/new.json                                    HTML AND AJAX
  #-------------------------------------------------------------------
  def new
    respond_to do |format|
      format.json { render :json => @admin }   
      format.xml  { render :xml => @admin }
      format.html
    end
  end
 
  # GET /admins/1
  # GET /admins/1.xml                                                       
  # GET /admins/1.json                                     HTML AND AJAX
  #-------------------------------------------------------------------
  def show
    respond_to do |format|
      format.json { render :json => @admin }
      format.xml  { render :xml => @admin }
      format.html      
    end
 
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :xml, :html)
  end
 
  # GET /admins/1/edit                                                      
  # GET /admins/1/edit.xml                                                      
  # GET /admins/1/edit.json                                HTML AND AJAX
  #-------------------------------------------------------------------
  def edit
    respond_to do |format|
      format.json { render :json => @admin }   
      format.xml  { render :xml => @admin }
      format.html
    end
 
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :xml, :html)
  end
 
  # DELETE /admins/1     
  # DELETE /admins/1.xml
  # DELETE /admins/1.json                                  HTML AND AJAX
  #-------------------------------------------------------------------
  def destroy
    @admin.destroy!
 
    respond_to do |format|
      format.json { respond_to_destroy(:ajax) }
      format.xml  { head :ok }
      format.html { respond_to_destroy(:html) }      
    end
 
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:json, :xml, :html)
  end
 
  # POST /admins
  # POST /admins.xml         
  # POST /admins.json                                      HTML AND AJAX
  #-----------------------------------------------------------------
  def create
    @admin = Admin.new(params[:admin])
 
    if @admin.save
      respond_to do |format|
        format.json { render :json => @admin.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { redirect_to :action => :index }
      end
    else
      respond_to do |format|
        format.json { render :text => "No se puede crear Admin", :status => :unprocessable_entity } # placeholder
        format.xml  { head :ok }
        format.html { render :action => :new, :status => :unprocessable_entity }
      end
    end
  end

# PUT /admins/1
  # PUT /admins/1.xml
  # PUT /admins/1.json                                            HTML AND AJAX
  #----------------------------------------------------------------------------
  def update
    if params[:admin][:password].blank?
      [:password,:password_confirmation,:current_password].collect{|p| params[:admin].delete(p) }
    else
      @admin.errors[:base] << "El password que has ingresado es incorrecto" unless @admin.valid_password?(params[:admin][:current_password])
    end
 
    respond_to do |format|
      if @admin.errors[:base].empty? and @admin.update_attributes(params[:admin])
        flash[:notice] = "Tu cuenta ha sido actualizada"
        format.json { render :json => @admin.to_json, :status => 200 }
        format.xml  { head :ok }
        format.html { render :action => :edit }
      else
        format.json { render :text => "No se puede actualizar Admin", :status => :unprocessable_entity } #placeholder
        format.xml  { render :xml => @admin.errors, :status => :unprocessable_entity }
        format.html { render :action => :edit, :status => :unprocessable_entity }
      end
    end
 
  rescue ActiveRecord::RecordNotFound
    respond_to_not_found(:js, :xml, :html)
  end
end