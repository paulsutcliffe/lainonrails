class ContactosController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => :new
end
