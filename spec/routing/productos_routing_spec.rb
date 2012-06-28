require "spec_helper"

describe ProductosController do
  describe "routing" do

    it "routes to #index" do
      get("/productos").should route_to("productos#index")
    end

    it "routes to #new" do
      get("/productos/new").should route_to("productos#new")
    end

    it "routes to #show" do
      get("/productos/1").should route_to("productos#show", :id => "1")
    end

    it "routes to #edit" do
      get("/productos/1/edit").should route_to("productos#edit", :id => "1")
    end

    it "routes to #create" do
      post("/productos").should route_to("productos#create")
    end

    it "routes to #update" do
      put("/productos/1").should route_to("productos#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/productos/1").should route_to("productos#destroy", :id => "1")
    end

  end
end
