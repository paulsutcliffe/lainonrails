require "spec_helper"

describe PromocionesController do
  describe "routing" do

    it "routes to #index" do
      get("/promociones").should route_to("promociones#index")
    end

    it "routes to #new" do
      get("/promociones/new").should route_to("promociones#new")
    end

    it "routes to #show" do
      get("/promociones/1").should route_to("promociones#show", :id => "1")
    end

    it "routes to #edit" do
      get("/promociones/1/edit").should route_to("promociones#edit", :id => "1")
    end

    it "routes to #create" do
      post("/promociones").should route_to("promociones#create")
    end

    it "routes to #update" do
      put("/promociones/1").should route_to("promociones#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/promociones/1").should route_to("promociones#destroy", :id => "1")
    end

  end
end
