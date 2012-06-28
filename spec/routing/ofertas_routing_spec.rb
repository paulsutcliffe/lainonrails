require "spec_helper"

describe OfertasController do
  describe "routing" do

    it "routes to #index" do
      get("/ofertas").should route_to("ofertas#index")
    end

    it "routes to #new" do
      get("/ofertas/new").should route_to("ofertas#new")
    end

    it "routes to #show" do
      get("/ofertas/1").should route_to("ofertas#show", :id => "1")
    end

    it "routes to #edit" do
      get("/ofertas/1/edit").should route_to("ofertas#edit", :id => "1")
    end

    it "routes to #create" do
      post("/ofertas").should route_to("ofertas#create")
    end

    it "routes to #update" do
      put("/ofertas/1").should route_to("ofertas#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/ofertas/1").should route_to("ofertas#destroy", :id => "1")
    end

  end
end
