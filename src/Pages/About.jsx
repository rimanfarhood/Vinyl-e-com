import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <div className="about-page">

      {/* ================= HERO ================= */}
      <section className="about-hero">

        <div className="about-hero-bg" />
        <div className="about-overlay" />

        <motion.div
          className="about-hero-content"
          initial="hidden"
          animate="show"
          variants={fadeUp}
        >
          <h1>Experience Music the Way It Was Meant to Be</h1>

         <p>
          Discover hand-picked vinyl records — from timeless classics
          to rare finds you won’t see anywhere else.
         </p>

          <button
            className="about-btn"
            onClick={() => navigate("/shop")}
          >
            Browse Collection
          </button>
        </motion.div>

      </section>

      {/* ================= STORY ================= */}
      <section className="about-section">
        <div className="about-grid">

          <motion.div variants={fadeUp} initial="hidden" whileInView="show">
            <h2>Our Story</h2>
            <p>
              We built this platform for people who believe music deserves
              more than a play button.
            </p>
            <p>
              Every record is curated to deliver emotion,
              quality, and authenticity.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" whileInView="show">
            <img
              src="https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
              alt="vinyl"
            />
          </motion.div>

        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="about-section">
        <div className="about-features">

          {[
            {
              title: "Curated Selection",
              desc: "Only high-quality vinyl records."
            },
            {
              title: "Premium Experience",
              desc: "Clean, fast and intuitive UI."
            },
            {
              title: "Trusted Quality",
              desc: "Every album verified."
            }
          ].map((item, i) => (
            <motion.div
              key={i}
              className="about-card"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
            >
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </motion.div>
          ))}

        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="about-why">
        <motion.div initial="hidden" whileInView="show" variants={fadeUp}>
          <h2>Why Vinyl?</h2>
          <p>
            Because music should be experienced, not skipped.
          </p>
        </motion.div>
      </section>

      {/* ================= CTA ================= */}
      <section className="about-cta">
        <motion.div initial="hidden" whileInView="show" variants={fadeUp}>
          <h2>Start Your Collection Today</h2>

          <button onClick={() => navigate("/shop")}>
            Explore Now
          </button>
        </motion.div>
      </section>

    </div>
  );
}