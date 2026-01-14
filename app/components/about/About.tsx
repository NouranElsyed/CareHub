import Motion from "../ui/Motion";

const About = () => {
  return (
    <section
      id={"about"}
      className="relative z-10 py-10 px-6 md:px-20 text-cyan-900 md:h-screen mt-30 md:my-0 flex items-center"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-14 items-center">
        {/* Text */}
        <Motion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            About <span className="text-amber-500">CareHub</span>
          </h2>

          <p className="text-gray-400 leading-relaxed mb-6">
            CareHub Medical Center is a modern healthcare platform designed to
            connect patients with expert doctors across multiple medical
            specialties.
          </p>

          <p className="text-gray-400 leading-relaxed">
            Our mission is to simplify medical appointments, enhance patient
            experience, and empower doctors with efficient digital tools — all
            in one secure system.
          </p>
        </Motion>

        {/* Stats / Cards */}
        <Motion
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-3/4 md:w-full mx-auto "
        >
          <div className="bg-cyan-600/10 backdrop-blur-md rounded-2xl p-6 text-center py-10 sm:py-6" >
            <h3 className="text-3xl font-bold text-[#feac39]">20+</h3>
            <p className="text-cyan-900 mt-2">Specialties</p>
          </div>

          <div className="bg-cyan-600/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#feac39]">50+</h3>
            <p className="text-cyan-900 mt-2">Doctors</p>
          </div>

          <div className="bg-cyan-600/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#feac39]">5K+</h3>
            <p className="text-cyan-900  mt-2">Patients</p>
          </div>

          <div className="bg-cyan-600/10 backdrop-blur-md rounded-2xl p-6 text-center">
            <h3 className="text-3xl font-bold text-[#feac39]">24/7</h3>
            <p className="text-cyan-900 mt-2">Support</p>
          </div>
        </Motion>
      </div>
    </section>
  );
};

export default About;
