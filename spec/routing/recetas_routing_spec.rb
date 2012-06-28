require "spec_helper"

describe RecetasController do
  describe "routing" do

    it "routes to #index" do
      get("/recetas").should route_to("recetas#index")
    end

    it "routes to #new" do
      get("/recetas/new").should route_to("recetas#new")
    end

    it "routes to #show" do
      get("/recetas/1").should route_to("recetas#show", :id => "1")
    end

    it "routes to #edit" do
      get("/recetas/1/edit").should route_to("recetas#edit", :id => "1")
    end

    it "routes to #create" do
      post("/recetas").should route_to("recetas#create")
    end

    it "routes to #update" do
      put("/recetas/1").should route_to("recetas#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/recetas/1").should route_to("recetas#destroy", :id => "1")
    end

  end
end
