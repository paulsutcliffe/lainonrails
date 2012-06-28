require "spec_helper"

describe InformacionesController do
  describe "routing" do

    it "routes to #index" do
      get("/informaciones").should route_to("informaciones#index")
    end

    it "routes to #new" do
      get("/informaciones/new").should route_to("informaciones#new")
    end

    it "routes to #show" do
      get("/informaciones/1").should route_to("informaciones#show", :id => "1")
    end

    it "routes to #edit" do
      get("/informaciones/1/edit").should route_to("informaciones#edit", :id => "1")
    end

    it "routes to #create" do
      post("/informaciones").should route_to("informaciones#create")
    end

    it "routes to #update" do
      put("/informaciones/1").should route_to("informaciones#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/informaciones/1").should route_to("informaciones#destroy", :id => "1")
    end

  end
end
