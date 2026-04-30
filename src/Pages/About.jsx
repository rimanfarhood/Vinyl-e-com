import React from "react";

export default function About() {
  return (
    <main className="bg-dark text-light">

      {/* HERO */}
      <section
        className="d-flex align-items-center"
        style={{
          height: "65vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",
        }}
      >
        {/* overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "rgba(0,0,0,0.65)",
          }}
        />

        {/* content */}
        <div className="container position-relative">
          <div className="">
            <div className="">
              <h1 className="display-3 fw-bold">
                Vinyl, Curated Properly
              </h1>
              <p className="lead text-light mt-3">
                Discover records that matter — from timeless classics to hidden gems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT GRID */}
      <section className="py-5" style={{display: "flex"}}>
        <div className="container" style={{ maxWidth: "1200px" }}>
          <div className="">

            <div className="">
              <div className="p-4 h-100 bg-black rounded shadow">
                <h3 className="mb-3">Who We Are</h3>
                <p className="text-secondary">
                  We are an online store focused on vinyl records, built to make
                  discovering and buying music simple and enjoyable.
                </p>
              </div>
            </div>

            <div className="">
              <div className="p-4 h-100 bg-black rounded shadow">
                <h3 className="mb-3">Our Selection</h3>
                <p className="text-secondary">
                  From iconic albums to hidden gems, every record is chosen with
                  intention — prioritizing quality, authenticity, and music that lasts.
                </p>
              </div>
            </div>

            <div className="">
              <div className="p-4 h-100 bg-black rounded shadow">
                <h3 className="mb-3">The Experience</h3>
                <p className="text-secondary">
                  Clean, fast, and intuitive. Our platform is designed so you can
                  focus on finding the right record, not navigating complexity.
                </p>
              </div>
            </div>

            <div className="">
              <div className="p-4 h-100 bg-black rounded shadow">
                <h3 className="mb-3">Why Vinyl</h3>
                <p className="text-secondary">
                  Vinyl creates a physical connection to music — something digital
                  formats cannot replicate.
                </p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* FINAL SECTION */}
      <section className="py-5 border-top border-secondary" style={{display: "flex"}}>
        <div className="container text-center" style={{ maxWidth: "1200px" }}>
          <h2 className="fw-bold">Built for People Who Care About Music</h2>
          <p className="text-secondary mt-3">
            Whether you're starting your collection or expanding it, this is a place
            where music comes first.
          </p>
        </div>
      </section>

    </main>
  );
}

// import React from "react";

// export default function About() {
//   return (
//     <main className="bg-dark text-light">

//       {/* HERO */}
//       <section
//         className="d-flex align-items-center"
//         style={{
//           height: "65vh",
//           backgroundImage:
//             "url('https://images.unsplash.com/photo-1511379938547-c1f69419868d')",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           position: "relative",
//         }}
//       >
//         {/* overlay */}
//         <div
//           style={{
//             position: "absolute",
//             inset: 0,
//             background: "rgba(0,0,0,0.65)",
//           }}
//         />

//         {/* content */}
//         <div className="container position-relative">
//           <div className="row">
//             <div className="col-lg-6">
//               <h1 className="display-3 fw-bold">
//                 Vinyl, Curated Properly
//               </h1>
//               <p className="lead text-light mt-3">
//                 Discover records that matter — from timeless classics to hidden gems.
//               </p>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ABOUT GRID */}
//       <section className="py-5">
//         <div className="container" style={{ maxWidth: "1200px" }}>
//           <div className="row g-5">

//             <div className="col-md-6">
//               <div className="p-4 h-100 bg-black rounded shadow">
//                 <h3 className="mb-3">Who We Are</h3>
//                 <p className="text-secondary">
//                   We are an online store focused on vinyl records, built to make
//                   discovering and buying music simple and enjoyable.
//                 </p>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="p-4 h-100 bg-black rounded shadow">
//                 <h3 className="mb-3">Our Selection</h3>
//                 <p className="text-secondary">
//                   From iconic albums to hidden gems, every record is chosen with
//                   intention — prioritizing quality, authenticity, and music that lasts.
//                 </p>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="p-4 h-100 bg-black rounded shadow">
//                 <h3 className="mb-3">The Experience</h3>
//                 <p className="text-secondary">
//                   Clean, fast, and intuitive. Our platform is designed so you can
//                   focus on finding the right record, not navigating complexity.
//                 </p>
//               </div>
//             </div>

//             <div className="col-md-6">
//               <div className="p-4 h-100 bg-black rounded shadow">
//                 <h3 className="mb-3">Why Vinyl</h3>
//                 <p className="text-secondary">
//                   Vinyl creates a physical connection to music — something digital
//                   formats cannot replicate.
//                 </p>
//               </div>
//             </div>

//           </div>
//         </div>
//       </section>

//       {/* FINAL SECTION */}
//       <section className="py-5 border-top border-secondary">
//         <div className="container text-center" style={{ maxWidth: "1200px" }}>
//           <h2 className="fw-bold">Built for People Who Care About Music</h2>
//           <p className="text-secondary mt-3">
//             Whether you're starting your collection or expanding it, this is a place
//             where music comes first.
//           </p>
//         </div>
//       </section>

//     </main>
//   );
// }