class SucursalesController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => :index
end
