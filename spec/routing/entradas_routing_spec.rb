require "spec_helper"

describe EntradasController do
  describe "routing" do

    it "routes to #index" do
      get("/entradas").should route_to("entradas#index")
    end

    it "routes to #new" do
      get("/entradas/new").should route_to("entradas#new")
    end

    it "routes to #show" do
      get("/entradas/1").should route_to("entradas#show", :id => "1")
    end

    it "routes to #edit" do
      get("/entradas/1/edit").should route_to("entradas#edit", :id => "1")
    end

    it "routes to #create" do
      post("/entradas").should route_to("entradas#create")
    end

    it "routes to #update" do
      put("/entradas/1").should route_to("entradas#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/entradas/1").should route_to("entradas#destroy", :id => "1")
    end

  end
end
