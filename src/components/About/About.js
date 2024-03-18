import authorImage from "../../images/authorImage.jpg";
import "./About.css";

const About = () => {
  return (
    <section className="about">
      <img className="about__image" src={authorImage} alt="Maryam Afzali" />
      <div className="about__container">
        <h2 className="about__ttile">About the author</h2>
        <p className="about__info">
          This block describes the project author. Here you should indicate your
          name, what you do, and which development technologies you know. You
          can also talk about your experience with Practicum, what you learned
          there, and how you can help potential customers.
        </p>
      </div>
    </section>
  );
};

export default About;
