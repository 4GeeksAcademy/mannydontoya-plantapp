import React from 'react';

export const WelcomeSection = () => {
  return (
    <div className="welcome-section text-center">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start">
            <h1 className="display-3">Welcome to Leafy Love</h1>
            <p>
              Explore the enchanting world of house and garden plants to
              transform your home into a lovely green haven!
            </p>
          </div>
          <div className="col-md-6">
            <a href="/login">
              <img
                src="https://heyrooted.com/cdn/shop/articles/plant_pots.jpg?v=1640713768"
                alt="House Plant"
                className="img-fluid rounded-circle w-100 glow-hover"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-md-6 order-md-2 text-md-start">
            <h1 className="display-3">Explore</h1>
            <p>
              Find the perfect house or garden plants to match your lifestyle
              and space. Explore options tailored to your needs—whether it’s
              low-maintenance plants for busy schedules, pet-safe greenery, or
              lush foliage to enhance air quality. Discover plants that thrive
              in any light level, boost wellness, and bring natural beauty to
              your home and garden.
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <a href="/library">
              <img
                src="https://greenboog.com/wp-content/uploads/2022/12/Humidity-min.jpeg"
                alt="House Plant"
                className="img-fluid rounded-circle w-100 glow-hover"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6 text-md-start">
            <h1 className="display-3">Inspiration Hub</h1>
            <p>
              Dive into a lush collection of plant-focused blogs, where style
              meets greenery, and trends blend with wellness. Discover the
              latest in plant care, decor inspiration, and eco-friendly living
              as experts and enthusiasts share insights on everything from
              interior plant styling to the health benefits of indoor greenery.
            </p>
          </div>
          <div className="col-md-6">
            <a href="/plantblog">
              <img
                src="https://www.bluemoonestatesales.com/cm/dpl/images/articles/53/luisa-brimble-1KYprL0KevE-unsplash.jpg"
                alt="House Plant"
                className="img-fluid rounded-circle w-100 glow-hover"
              />
            </a>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="row d-flex align-items-center">
          <div className="col-md-6 order-md-2 text-md-start">
            <h1 className="display-3">Create your dream garden</h1>
            <p>
              Design your dream garden with our intuitive digital garden tool!
              Create a custom layout that mirrors your garden space and choose
              from a variety of plant, vegetable, and flower icons to add to
              your design. With built-in lighting level indicators, you can plan
              and visualize the best spots for each plant based on their
              sunlight requirements. Watch your garden vision come to life in
              this interactive and user-friendly tool!
            </p>
          </div>
          <div className="col-md-6 order-md-1">
            <a href="/my-garden">
              <img
                src="https://cdn.gethypervisual.com/images/shopify/809fa5b8-d485-40d6-90cf-0fd9b1836777/w1200_3d79_AdobeStock_85640230.jpeg"
                alt="House Plant"
                className="img-fluid rounded-circle glow-hover"
              />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeSection;


