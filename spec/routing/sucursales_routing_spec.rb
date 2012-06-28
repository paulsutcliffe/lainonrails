require "spec_helper"

describe SucursalesController do
  describe "routing" do

    it "routes to #index" do
      get("/sucursales").should route_to("sucursales#index")
    end

    it "routes to #new" do
      get("/sucursales/new").should route_to("sucursales#new")
    end

    it "routes to #show" do
      get("/sucursales/1").should route_to("sucursales#show", :id => "1")
    end

    it "routes to #edit" do
      get("/sucursales/1/edit").should route_to("sucursales#edit", :id => "1")
    end

    it "routes to #create" do
      post("/sucursales").should route_to("sucursales#create")
    end

    it "routes to #update" do
      put("/sucursales/1").should route_to("sucursales#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/sucursales/1").should route_to("sucursales#destroy", :id => "1")
    end

  end
end
