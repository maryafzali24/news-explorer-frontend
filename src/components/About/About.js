import authorImage from "../../images/istockphoto-1252210017-1024x1024.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Maryam Afzali" />
      <div className="about__container">
        <h2 className="about__title">About the author</h2>
        <p className="about__info">
          Hi, My name is Maryam Afzali, I'm full stack software engineer
          proficient in JavaScript, HTML, CSS, Node, Express, and React. I
          transitioned from financial background to web development.
        </p>
      </div>
    </section>
  );
};

export default About;
