import React from 'react';

const About = () => {
  const [height, setHeight] = React.useState(0);
  console.log(height);

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setHeight(window.pageYOffset);
    });
    return window.removeEventListener('scroll', () => {});
  });
  return (
    <section className="section about-section">
      <h1 className="section-title">about us</h1>
      <p>
        Lorem ipsum dolor, sit amet consectetur adipisicing elit.
        Exercitationem, libero. Sit perspiciatis maxime quaerat quo. Tempore
        aliquid nam, in pariatur cum sint dolores tempora cupiditate praesentium
        sunt exercitationem veniam odio, minima amet dolor eum soluta quibusdam
        maxime impedit eos. Exercitationem consequuntur dicta, fugit numquam at
        ullam dolorem tenetur amet nihil.
      </p>
    </section>
  );
};

export default About;
