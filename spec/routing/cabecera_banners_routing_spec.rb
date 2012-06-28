require "spec_helper"

describe CabeceraBannersController do
  describe "routing" do

    it "routes to #index" do
      get("/cabecera_banners").should route_to("cabecera_banners#index")
    end

    it "routes to #new" do
      get("/cabecera_banners/new").should route_to("cabecera_banners#new")
    end

    it "routes to #show" do
      get("/cabecera_banners/1").should route_to("cabecera_banners#show", :id => "1")
    end

    it "routes to #edit" do
      get("/cabecera_banners/1/edit").should route_to("cabecera_banners#edit", :id => "1")
    end

    it "routes to #create" do
      post("/cabecera_banners").should route_to("cabecera_banners#create")
    end

    it "routes to #update" do
      put("/cabecera_banners/1").should route_to("cabecera_banners#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/cabecera_banners/1").should route_to("cabecera_banners#destroy", :id => "1")
    end

  end
end
