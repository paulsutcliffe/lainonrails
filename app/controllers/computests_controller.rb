class ComputestsController < InheritedResources::Base
  before_filter :authenticate_usuario!
end
