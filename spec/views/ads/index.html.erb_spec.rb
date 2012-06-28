require 'spec_helper'

describe "ads/index" do
  before(:each) do
    assign(:ads, [
      stub_model(Ad),
      stub_model(Ad)
    ])
  end

  it "renders a list of ads" do
    render
    # Run the generator again with the --webrat flag if you want to use webrat matchers
  end
end
