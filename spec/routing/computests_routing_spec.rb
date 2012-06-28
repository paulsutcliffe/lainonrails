require "spec_helper"

describe ComputestsController do
  describe "routing" do

    it "routes to #index" do
      get("/computests").should route_to("computests#index")
    end

    it "routes to #new" do
      get("/computests/new").should route_to("computests#new")
    end

    it "routes to #show" do
      get("/computests/1").should route_to("computests#show", :id => "1")
    end

    it "routes to #edit" do
      get("/computests/1/edit").should route_to("computests#edit", :id => "1")
    end

    it "routes to #create" do
      post("/computests").should route_to("computests#create")
    end

    it "routes to #update" do
      put("/computests/1").should route_to("computests#update", :id => "1")
    end

    it "routes to #destroy" do
      delete("/computests/1").should route_to("computests#destroy", :id => "1")
    end

  end
end
