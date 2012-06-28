require 'spec_helper'

describe "ads/show" do
  before(:each) do
    @ad = assign(:ad, stub_model(Ad))
  end

  it "renders attributes in <p>" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
