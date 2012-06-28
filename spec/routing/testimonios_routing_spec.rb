require "spec_helper"

describe TestimoniosController do
  describe "routing" do

    it "routes to #index" do
      get("/testimonios").should route_to("testimonios#index")
    end

    it "routes to #new" do
      get("/testimonios/new").should route_to("testimonios#new")
    end

    it "routes to #show" do
      get("/testimonios/1").should route_to("testimonios#show", :id => "1")
    end

    it "routes to #edit" do
      get("/testimonios/1/edit").should route_to("testimonios#edit", :id => "1")
    end

    it "routes to #create" do
      post("/testimonios").should route_to("testimonios#create")
    end

    it "routes to #update" do
      put("/testimonios/1").should route_to("testimonios#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/testimonios/1").should route_to("testimonios#destroy", :id => "1")
    end

  end
end
