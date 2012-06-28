require "spec_helper"

describe ContactosController do
  describe "routing" do

    it "routes to #index" do
      get("/contactos").should route_to("contactos#index")
    end

    it "routes to #new" do
      get("/contactos/new").should route_to("contactos#new")
    end

    it "routes to #show" do
      get("/contactos/1").should route_to("contactos#show", :id => "1")
    end

    it "routes to #edit" do
      get("/contactos/1/edit").should route_to("contactos#edit", :id => "1")
    end

    it "routes to #create" do
      post("/contactos").should route_to("contactos#create")
    end

    it "routes to #update" do
      put("/contactos/1").should route_to("contactos#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/contactos/1").should route_to("contactos#destroy", :id => "1")
    end

  end
end
