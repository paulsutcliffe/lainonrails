class EntradasController < InheritedResources::Base
  before_filter :authenticate_admin!, :except => [ :index, :show ]
end
