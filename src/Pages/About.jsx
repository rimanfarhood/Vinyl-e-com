import { Link } from "react-router-dom";
import { FaRecordVinyl, FaMusic, FaStar, FaHeart } from "react-icons/fa";

const cards = [
  {
    Icon: FaRecordVinyl,
    title: "Who We Are",
    text: "An online store focused on vinyl records, built to make discovering and buying music simple and enjoyable.",
  },
  {
    Icon: FaMusic,
    title: "Our Selection",
    text: "From iconic albums to hidden gems, every record is chosen with intention — prioritizing quality, authenticity, and music that lasts.",
  },
  {
    Icon: FaStar,
    title: "The Experience",
    text: "Clean, fast, and intuitive. Our platform is designed so you can focus on finding the right record, not navigating complexity.",
  },
  {
    Icon: FaHeart,
    title: "Why Vinyl",
    text: "Vinyl creates a physical connection to music — something digital formats cannot replicate.",
  },
];

const stats = [
  { value: "500+", label: "Records" },
  { value: "20+", label: "Genres" },
  { value: "100%", label: "Curated" },
];

export default function About() {
  return (
    <>
      <div className="about-hero">
        <div className="about-hero__content">
          <h1>Vinyl, Curated Properly</h1>
          <p>Discover records that matter — from timeless classics to hidden gems.</p>
        </div>
      </div>

      <section className="about-grid">
        {cards.map(({ Icon, title, text }) => (
          <div key={title} className="about-card">
            <Icon className="about-card__icon" />
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        ))}
      </section>

      <section className="about-stats">
        {stats.map(({ value, label }) => (
          <div key={label} className="about-stats__item">
            <span className="about-stats__value">{value}</span>
            <span className="about-stats__label">{label}</span>
          </div>
        ))}
      </section>

      <section className="about-cta">
        <h2>Built for People Who Care About Music</h2>
        <p>Whether you're starting your collection or expanding it, this is a place where music comes first.</p>
        <Link to="/shop" className="hero-button">Browse Collection</Link>
      </section>
    </>
  );
}
