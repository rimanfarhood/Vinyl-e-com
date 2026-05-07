import React from "react";

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
